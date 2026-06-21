function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(data));
}

function buildPrompt({ scenario, goal }) {
  return [
    "你是一个帮助高中生设计行为科学小实验的研究助手。",
    "任务：根据用户给出的排队场景和目标，设计一个可以在互动网页中呈现的队伍布局。",
    "研究背景：这个项目研究 visible queue length 如何影响高中生的 line choice。理论线索包括 social proof、informational social influence、queue length as a signal, and perceived reliability.",
    "重要限制：真实用户研究数据目前还没有接入这个工具，所以不要编造样本数、百分比、显著性、图表或研究结论。",
    "设计要求：",
    "- 如果目标是让 A/B/C 队看起来人更多，对应队伍必须是三条队伍里可见人数最多的队。",
    "- 如果目标是三条队伍看起来一样多，A/B/C 的人数必须相同或几乎相同。",
    "- 如果目标是让整体等待时间最少，优先设计均衡分流，而不是制造某一条明显人多。",
    "- 保持控制变量意识：入口、颜色、距离、人物大小、标签、说明文字、交互方式应尽量一致。",
    "输出中文，短而具体。必须包含：",
    "1. 推荐队伍布局：A/B/C 各多少人，哪条队更突出或是否一样多。",
    "2. 为什么这样设计：它和从众、社会证明、速度判断或可靠性信号有什么关系。",
    "3. 需要控制的变量。",
    "4. 研究风险：用户可能因为什么非目标因素做选择。",
    "",
    `用户场景：${scenario}`,
    `用户目标：${goal}`
  ].join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Only POST requests are allowed." });
    return;
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";

  if (!apiKey) {
    sendJson(res, 500, {
      error: "Server is missing DEEPSEEK_API_KEY. Please add it in Vercel Environment Variables."
    });
    return;
  }

  try {
    const scenario = String(req.body?.scenario || "").trim();
    const goal = String(req.body?.goal || "").trim();

    if (!scenario || !goal) {
      sendJson(res, 400, { error: "Please provide both scenario and goal." });
      return;
    }

    if (scenario.length > 1200 || goal.length > 200) {
      sendJson(res, 400, { error: "Input is too long." });
      return;
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are a careful behavioral science research assistant. Do not fabricate data."
          },
          {
            role: "user",
            content: buildPrompt({ scenario, goal })
          }
        ],
        thinking: { type: "disabled" },
        temperature: 0.2,
        max_tokens: 1200,
        stream: false
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      sendJson(res, response.status, {
        error: data?.error?.message || "DeepSeek API request failed."
      });
      return;
    }

    sendJson(res, 200, {
      answer: data?.choices?.[0]?.message?.content || "",
      model: data?.model || model
    });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unexpected server error." });
  }
};
