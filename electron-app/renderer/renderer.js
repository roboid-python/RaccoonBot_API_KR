(function () {
  const PAGE_ORDER = ["home", "usage", "peripherals", "unplugged", "plugged", "blocks", "specs", "control"];

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
    teardownBlocksPage();
    const c = currentContent();
    const page = c.pages[currentPage];
    contentEl.innerHTML =
      '<h1 class="page-title">' + page.title + '</h1>' +
      '<div class="page-body">' + page.html + '</div>';

    if (currentPage === "control") {
      bindControlPage();
    } else if (currentPage === "blocks") {
      bindBlocksPage();
    }
  }

  // ----- block coding page -----
  let blocklyWorkspace = null;
  let blocklyState = null;

  function teardownBlocksPage() {
    if (blocklyWorkspace) {
      try {
        blocklyState = window.RaccoonBlockly.saveWorkspace(blocklyWorkspace);
      } catch (e) { /* keep previous state */ }
      blocklyWorkspace.dispose();
      blocklyWorkspace = null;
    }
  }

  function bindBlocksPage() {
    const container = document.getElementById("blockly-workspace");
    const codeEl = document.getElementById("python-code");
    const statusEl = document.getElementById("blocks-status");
    const fileInput = document.getElementById("blocks-file-input");

    blocklyWorkspace = window.RaccoonBlockly.init(container, { lang: currentLang });
    if (blocklyState) {
      try {
        window.RaccoonBlockly.loadWorkspace(blocklyWorkspace, blocklyState);
      } catch (e) {
        blocklyState = null;
      }
    }

    const updateCode = () => {
      codeEl.textContent = window.RaccoonBlockly.generatePython(blocklyWorkspace);
    };
    blocklyWorkspace.addChangeListener((event) => {
      if (!event.isUiEvent) updateCode();
    });
    updateCode();

    let statusTimer = null;
    const flashStatus = (msg) => {
      statusEl.textContent = msg;
      clearTimeout(statusTimer);
      statusTimer = setTimeout(() => { statusEl.textContent = ""; }, 2000);
    };
    const msg = (ko, ja) => (currentLang === "ko" ? ko : ja);

    const downloadFile = (name, text, mime) => {
      const a = document.createElement("a");
      const url = URL.createObjectURL(new Blob([text], { type: mime }));
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    };

    document.getElementById("btn-blocks-new").addEventListener("click", () => {
      const ok = confirm(msg("작업 공간의 모든 블록을 지울까요?", "ワークスペースのブロックをすべて消しますか?"));
      if (!ok) return;
      blocklyWorkspace.clear();
      blocklyState = null;
      updateCode();
    });

    document.getElementById("btn-blocks-save").addEventListener("click", () => {
      const state = window.RaccoonBlockly.saveWorkspace(blocklyWorkspace);
      downloadFile("raccoon-blocks.json", JSON.stringify(state, null, 2), "application/json");
      flashStatus(msg("저장됨", "保存しました"));
    });

    document.getElementById("btn-blocks-load").addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          window.RaccoonBlockly.loadWorkspace(blocklyWorkspace, JSON.parse(reader.result));
          updateCode();
          flashStatus(msg("불러옴", "読み込みました"));
        } catch (e) {
          flashStatus(msg("파일 형식 오류", "ファイル形式エラー"));
        }
        fileInput.value = "";
      };
      reader.readAsText(file);
    });

    document.getElementById("btn-code-copy").addEventListener("click", async () => {
      await navigator.clipboard.writeText(codeEl.textContent);
      flashStatus(msg("복사됨", "コピーしました"));
    });

    document.getElementById("btn-code-save").addEventListener("click", () => {
      downloadFile("raccoon_program.py", codeEl.textContent, "text/x-python");
      flashStatus(msg("저장됨", "保存しました"));
    });
  }

  window.addEventListener("resize", () => {
    if (blocklyWorkspace) window.RaccoonBlockly.resizeWorkspace(blocklyWorkspace);
  });

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
