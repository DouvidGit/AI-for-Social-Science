(function () {
  const script = document.currentScript;
  const partnerSite = script?.dataset?.partnerSite || window.location.hostname || "unknown_partner";
  const apiUrl = script?.dataset?.apiUrl || "https://doudoulu.com/api/verification-events";
  const rootId = "queue-verification-widget-root";

  if (document.getElementById(rootId)) return;

  function getSessionId() {
    const key = "queueVerificationParticipantSessionId";
    let value = sessionStorage.getItem(key);
    if (!value) {
      value = `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(key, value);
    }
    return value;
  }

  function buildCondition() {
    const labels = ["A", "B", "C"];
    const condition = Math.random() < 0.5 ? "crowd_signal_3_4_12" : "balanced_control_4_4_4";
    const crowdedIndex = Math.floor(Math.random() * labels.length);
    const counts = {};

    if (condition === "crowd_signal_3_4_12") {
      const shorterCounts = [3, 4];
      labels.forEach((label, index) => {
        counts[label] = index === crowdedIndex ? 12 : shorterCounts.shift();
      });
    } else {
      labels.forEach((label) => {
        counts[label] = 4;
      });
    }

    return {
      labels,
      condition,
      crowdedQueue: condition === "crowd_signal_3_4_12" ? labels[crowdedIndex] : null,
      counts
    };
  }

  function personStyle(index, count) {
    const isMobile = window.matchMedia("(max-width: 520px)").matches;
    const bottomStep = isMobile ? 6 : 8;
    const sideStep = isMobile ? 5 : 7;
    const bottom = (isMobile ? 18 : 23) + index * bottomStep;
    const offset = count > 8
      ? [-sideStep, sideStep, 0][index % 3]
      : (index % 2 === 0 ? -sideStep : sideStep);
    return `bottom: ${bottom}px; margin-left: ${offset}px`;
  }

  function renderPeople(count) {
    let html = "";
    for (let index = 0; index < count; index += 1) {
      html += `<span class="qv-person" style="${personStyle(index, count)}"></span>`;
    }
    return html;
  }

  const task = buildCondition();
  const root = document.createElement("div");
  root.id = rootId;
  document.documentElement.appendChild(root);
  const shadow = root.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        font-family: Arial, "Microsoft YaHei", "PingFang SC", sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      .qv-overlay {
        position: fixed;
        inset: 0;
        background: #fff;
        color: #202124;
        display: grid;
        place-items: center;
        padding: 16px;
      }

      .qv-dialog {
        width: min(100%, 520px);
        border: 4px solid #2f9ac6;
        background: #fff;
      }

      .qv-overlay.is-page-waiting .qv-dialog {
        display: none;
      }

      .qv-security {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 10px 12px 8px;
        color: #303134;
        font-size: 14px;
        font-weight: 700;
      }

      .qv-shield {
        width: 25px;
        height: 28px;
        border: 2px solid #4a90e2;
        border-radius: 8px 8px 10px 10px;
        position: relative;
        flex: 0 0 auto;
      }

      .qv-shield::before {
        content: "";
        position: absolute;
        inset: 7px 8px;
        border-right: 2px solid #4a90e2;
        border-bottom: 2px solid #4a90e2;
        transform: rotate(38deg);
      }

      .qv-head {
        margin: 0 8px;
        padding: 26px 32px 24px;
        background: #4a90e2;
        color: #fff;
      }

      .qv-head h1 {
        margin: 0;
        font-size: 30px;
        line-height: 1.18;
        font-weight: 700;
        letter-spacing: 0;
        white-space: nowrap;
      }

      .qv-head p {
        margin: 6px 0 0;
        color: rgba(255, 255, 255, 0.92);
        font-size: 16px;
        line-height: 1.35;
      }

      .qv-body {
        padding: 8px;
      }

      .qv-loading,
      .qv-success {
        min-height: 294px;
        display: none;
        place-items: center;
        background: #fff;
      }

      .qv-spinner {
        width: 46px;
        height: 46px;
        border: 5px solid #e7e7e7;
        border-top-color: #4a90e2;
        border-radius: 50%;
        animation: qv-spin 760ms linear infinite;
      }

      .qv-success {
        color: #303134;
        font-size: 36px;
        font-weight: 700;
      }

      .qv-overlay.is-loading .qv-loading,
      .qv-overlay.is-submitting .qv-loading,
      .qv-overlay.is-passed .qv-success {
        display: grid;
      }

      .qv-overlay.is-loading .qv-challenge,
      .qv-overlay.is-loading .qv-foot,
      .qv-overlay.is-submitting .qv-challenge,
      .qv-overlay.is-submitting .qv-foot,
      .qv-overlay.is-passed .qv-challenge,
      .qv-overlay.is-passed .qv-foot,
      .qv-overlay.is-passed .qv-loading {
        display: none;
      }

      .qv-options {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 4px;
        padding: 0;
      }

      .qv-option {
        min-width: 0;
        min-height: 176px;
        padding: 8px 6px;
        border: 0;
        background: #f7f7f7;
        color: #202124;
        cursor: pointer;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 8px;
        text-align: center;
        overflow: hidden;
        font: inherit;
      }

      .qv-option:hover,
      .qv-option:focus-visible {
        box-shadow: inset 0 0 0 1px #4a90e2;
        outline: none;
      }

      .qv-option.is-selected {
        box-shadow: inset 0 0 0 2px #4a90e2;
      }

      .qv-label {
        color: #303134;
        font-size: 13px;
        font-weight: 600;
      }

      .qv-track {
        position: relative;
        width: 100%;
        min-width: 0;
        min-height: 126px;
        border: 1px solid #e2e2e2;
        background: linear-gradient(90deg, rgba(220, 220, 220, 0.28), transparent 46%, rgba(220, 220, 220, 0.28)), #fff;
        overflow: hidden;
      }

      .qv-gate {
        position: absolute;
        left: 50%;
        bottom: 5px;
        transform: translateX(-50%);
        width: 34px;
        height: 14px;
        border: 1px solid #9aa0a6;
        background: #f1f3f4;
      }

      .qv-person {
        position: absolute;
        left: 50%;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: 1px solid rgba(32, 33, 36, 0.16);
        background: #6f7f8f;
        transform: translateX(-50%);
      }

      .qv-person:nth-child(2n) {
        background: #8a7d74;
      }

      .qv-person:nth-child(3n) {
        background: #617b6e;
      }

      .qv-foot {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 96px;
        align-items: center;
        gap: 14px;
        padding: 12px 8px 8px;
        border-top: 1px solid #e5e5e5;
      }

      .qv-button {
        min-width: 96px;
        min-height: 42px;
        border: 0;
        background: #4a90e2;
        color: #fff;
        cursor: pointer;
        font-weight: 700;
        letter-spacing: 0;
        font: inherit;
      }

      .qv-button:hover:not(:disabled),
      .qv-button:focus-visible:not(:disabled) {
        background: #3c7fc8;
        outline: none;
      }

      .qv-button:disabled {
        background: #d8d8d8;
        color: #8b9096;
        cursor: not-allowed;
      }

      @keyframes qv-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 520px) {
        .qv-overlay {
          padding: 10px;
          place-items: center start;
        }

        .qv-dialog {
          width: min(calc(100vw - 20px), 330px);
          border-width: 3px;
        }

        .qv-security {
          padding: 7px 9px 6px;
        }

        .qv-head {
          margin: 0 6px;
          padding: 16px 15px 14px;
        }

        .qv-head h1 {
          font-size: 19px;
        }

        .qv-head p {
          font-size: 13px;
        }

        .qv-body {
          padding: 6px;
        }

        .qv-loading,
        .qv-success {
          min-height: 220px;
        }

        .qv-success {
          font-size: 30px;
        }

        .qv-options {
          gap: 0;
        }

        .qv-option {
          min-height: 118px;
          padding: 6px 4px;
          gap: 6px;
        }

        .qv-label {
          font-size: 11px;
        }

        .qv-track {
          min-height: 80px;
        }

        .qv-person {
          width: 9px;
          height: 9px;
        }

        .qv-gate {
          width: 26px;
          height: 10px;
        }

        .qv-foot {
          grid-template-columns: minmax(0, 1fr) 74px;
          gap: 8px;
          padding: 10px 6px 6px;
        }

        .qv-button {
          min-width: 74px;
          min-height: 38px;
        }
      }
    </style>

    <div class="qv-overlay is-page-waiting is-loading" role="dialog" aria-modal="true" aria-labelledby="qv-title">
      <section class="qv-dialog">
        <div class="qv-security">
          <span class="qv-shield" aria-hidden="true"></span>
          <span>安全验证</span>
        </div>
        <div class="qv-head">
          <h1 id="qv-title">请选择你认为正确的队伍</h1>
          <p>选择后点击验证。</p>
        </div>
        <div class="qv-body">
          <div class="qv-loading" aria-hidden="true">
            <span class="qv-spinner"></span>
          </div>
          <div class="qv-challenge">
            <div class="qv-options" role="radiogroup" aria-label="选择正确的队伍"></div>
          </div>
          <div class="qv-success">已通过</div>
        </div>
        <div class="qv-foot">
          <span></span>
          <button class="qv-button" type="button" disabled>验证</button>
        </div>
      </section>
    </div>
  `;

  const overlay = shadow.querySelector(".qv-overlay");
  const options = shadow.querySelector(".qv-options");
  const button = shadow.querySelector(".qv-button");
  let selectedQueue = null;
  let startedAt = performance.now();
  let startedAtIso = new Date().toISOString();
  let isComplete = false;

  function renderQueues() {
    options.innerHTML = task.labels.map((label) => `
      <button class="qv-option" type="button" role="radio" aria-checked="false" data-queue="${label}">
        <span class="qv-label">队伍 ${label}</span>
        <span class="qv-track" aria-hidden="true">
          <span class="qv-gate"></span>
          ${renderPeople(task.counts[label])}
        </span>
      </button>
    `).join("");
  }

  function chooseQueue(queue) {
    if (isComplete || overlay.classList.contains("is-loading")) return;
    selectedQueue = queue;
    button.disabled = false;
    shadow.querySelectorAll(".qv-option").forEach((option) => {
      const isSelected = option.dataset.queue === queue;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-checked", String(isSelected));
    });
  }

  async function submitRecord(record) {
    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
        keepalive: true
      });
    } catch (error) {
      console.warn("Queue verification record could not be submitted.", error);
    }
  }

  function completeVerification() {
    if (!selectedQueue || isComplete) return;
    isComplete = true;
    button.disabled = true;
    button.textContent = "验证中";
    overlay.classList.add("is-submitting");

    const record = {
      partner_site: partnerSite,
      partner_page_url: window.location.href,
      participant_session_id: getSessionId(),
      task_type: "human_verification_cover",
      prompt: "请选择你认为正确的队伍。",
      condition: task.condition,
      selected_queue: selectedQueue,
      crowded_queue: task.crowdedQueue,
      queue_counts: task.counts,
      selected_crowded_queue: task.crowdedQueue ? selectedQueue === task.crowdedQueue : null,
      response_time_seconds: Number(((performance.now() - startedAt) / 1000).toFixed(2)),
      started_at: startedAtIso,
      selected_at: new Date().toISOString(),
      user_agent: navigator.userAgent
    };

    submitRecord(record);

    window.setTimeout(() => {
      overlay.classList.remove("is-submitting");
      overlay.classList.add("is-passed");
    }, 720);

    window.setTimeout(() => {
      root.remove();
      window.dispatchEvent(new CustomEvent("queueVerificationPassed", { detail: record }));
    }, 1500);
  }

  window.setTimeout(() => {
    overlay.classList.remove("is-page-waiting");
    window.setTimeout(() => {
      renderQueues();
      startedAt = performance.now();
      startedAtIso = new Date().toISOString();
      overlay.classList.remove("is-loading");
    }, 850);
  }, 1000);

  options.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const option = target?.closest(".qv-option");
    if (!option) return;
    chooseQueue(option.dataset.queue);
  });

  button.addEventListener("click", completeVerification);
})();
