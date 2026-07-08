(function () {
  const PAGE_ORDER = ["home", "usage", "peripherals", "unplugged", "plugged", "specs", "control"];

  let currentLang = "ko";
  let currentPage = "home";
  let cameraRunning = false;
  let logText = "";

  const CONTENT_BY_LANG = { ko: window.CONTENT_KO, ja: window.CONTENT_JA };

  const navList = document.getElementById("nav-list");
  const contentEl = document.getElementById("content");
  const appTitleEl = document.getElementById("app-title");
  const langLabelEl = document.getElementById("lang-label");
  const langButtons = document.querySelectorAll(".lang-btn");

  function currentContent() {
    return CONTENT_BY_LANG[currentLang];
  }

  function renderChrome() {
    const c = currentContent();
    appTitleEl.textContent = c.appTitle;
    langLabelEl.textContent = c.langLabel;

    navList.innerHTML = "";
    PAGE_ORDER.forEach((pageId) => {
      const btn = document.createElement("button");
      btn.className = "nav-item" + (pageId === currentPage ? " active" : "");
      btn.textContent = c.nav[pageId];
      btn.addEventListener("click", () => {
        currentPage = pageId;
        renderChrome();
        renderPage();
      });
      navList.appendChild(btn);
    });

    langButtons.forEach((b) => b.classList.toggle("active", b.dataset.lang === currentLang));
  }

  function renderPage() {
    const c = currentContent();
    const page = c.pages[currentPage];
    contentEl.innerHTML =
      '<h1 class="page-title">' + page.title + '</h1>' +
      '<div class="page-body">' + page.html + '</div>';

    if (currentPage === "control") {
      bindControlPage();
    }
  }

  function bindControlPage() {
    const startBtn = document.getElementById("btn-start-camera");
    const stopBtn = document.getElementById("btn-stop-camera");
    const statusEl = document.getElementById("camera-status");
    const logEl = document.getElementById("camera-log");

    logEl.textContent = logText;
    logEl.scrollTop = logEl.scrollHeight;
    updateControlUI(startBtn, stopBtn, statusEl);

    startBtn.addEventListener("click", async () => {
      const result = await window.robotAPI.startCamera();
      if (result.ok) {
        cameraRunning = true;
        updateControlUI(startBtn, stopBtn, statusEl);
      } else {
        appendLog(logEl, "[error] " + result.message + "\n");
      }
    });

    stopBtn.addEventListener("click", async () => {
      await window.robotAPI.stopCamera();
      cameraRunning = false;
      updateControlUI(startBtn, stopBtn, statusEl);
    });
  }

  function updateControlUI(startBtn, stopBtn, statusEl) {
    const c = currentContent();
    startBtn.disabled = cameraRunning;
    stopBtn.disabled = !cameraRunning;
    statusEl.className = "status-badge " + (cameraRunning ? "status-running" : "status-idle");
    statusEl.textContent = cameraRunning
      ? (currentLang === "ko" ? "실행중" : "実行中")
      : (currentLang === "ko" ? "대기중" : "待機中");
  }

  function appendLog(logEl, text) {
    logText += text;
    if (logEl) {
      logEl.textContent = logText;
      logEl.scrollTop = logEl.scrollHeight;
    }
  }

  window.robotAPI.onLog((data) => {
    const logEl = document.getElementById("camera-log");
    appendLog(logEl, data);
  });

  window.robotAPI.onExit((code) => {
    cameraRunning = false;
    const startBtn = document.getElementById("btn-start-camera");
    const stopBtn = document.getElementById("btn-stop-camera");
    const statusEl = document.getElementById("camera-status");
    if (startBtn && stopBtn && statusEl) {
      updateControlUI(startBtn, stopBtn, statusEl);
    }
    const logEl = document.getElementById("camera-log");
    appendLog(logEl, "\n[exit] code=" + code + "\n");
  });

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      renderChrome();
      renderPage();
    });
  });

  renderChrome();
  renderPage();
})();
