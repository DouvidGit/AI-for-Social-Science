function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "POST, OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type");
  res.end(JSON.stringify(data));
}

function normalizeBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return {};
    }
  }
  return req.body;
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function cleanQueue(value) {
  const label = String(value || "").trim().toUpperCase();
  return ["A", "B", "C"].includes(label) ? label : null;
}

function cleanCounts(value) {
  const source = value && typeof value === "object" ? value : {};
  return {
    A: Number.isFinite(Number(source.A)) ? Number(source.A) : null,
    B: Number.isFinite(Number(source.B)) ? Number(source.B) : null,
    C: Number.isFinite(Number(source.C)) ? Number(source.C) : null
  };
}

function buildRow(body, req) {
  const selectedQueue = cleanQueue(body.selected_queue);
  const crowdedQueue = cleanQueue(body.crowded_queue);
  const queueCounts = cleanCounts(body.queue_counts);
  const responseTime = Number(body.response_time_seconds);
  const rawPayload = body && typeof body === "object" ? body : {};

  return {
    partner_site: cleanText(body.partner_site, 120) || "unknown_partner",
    partner_page_url: cleanText(body.partner_page_url, 500),
    participant_session_id: cleanText(body.participant_session_id, 160),
    task_type: cleanText(body.task_type, 120) || "human_verification_cover",
    condition: cleanText(body.condition, 80),
    selected_queue: selectedQueue,
    crowded_queue: crowdedQueue,
    queue_counts: queueCounts,
    selected_crowded_queue: crowdedQueue ? selectedQueue === crowdedQueue : null,
    response_time_seconds: Number.isFinite(responseTime) ? responseTime : null,
    started_at: body.started_at || null,
    selected_at: body.selected_at || null,
    user_agent: cleanText(body.user_agent || req.headers["user-agent"], 500),
    raw_payload: rawPayload
  };
}

async function postToSupabase(row) {
  const supabaseUrl = process.env.SUPABASE_URL || "https://ubjlmjpawywldzrvedvk.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXAiOiJ1YmpobG1qcGF3eXdsZHpydmVkdmsiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4MDc4MzEwMiwiZXhwIjoyMDk2MzU5MTAyfQ.UGThz_KRuTEYwaRFkT41tFJaGmV1TmWvuThzpcRNMF8";

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase configuration.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/verification_events`, {
    method: "POST",
    headers: {
      "apikey": supabaseKey,
      "authorization": `Bearer ${supabaseKey}`,
      "content-type": "application/json",
      "prefer": "return=minimal"
    },
    body: JSON.stringify(row)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase error ${response.status}`);
  }
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Only POST requests are allowed." });
    return;
  }

  try {
    const body = normalizeBody(req);
    const row = buildRow(body, req);
    await postToSupabase(row);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message || "Unexpected server error." });
  }
};
