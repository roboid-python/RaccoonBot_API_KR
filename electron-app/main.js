const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const PROJECT_ROOT = path.join(__dirname, '..');
const CAMERA_SCRIPT = path.join(PROJECT_ROOT, 'camera_control.py');
const VENV_PYTHON = 'C:\\Users\\Public\\raccoon_venv\\Scripts\\python.exe';

let mainWindow = null;
let cameraProcess = null;

function resolvePython() {
  if (fs.existsSync(VENV_PYTHON)) return VENV_PYTHON;
  return process.platform === 'win32' ? 'python' : 'python3';
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

function stopCameraProcess(force = false) {
  if (!cameraProcess || cameraProcess.killed) return;
  const proc = cameraProcess;

  if (force) {
    proc.kill();
    cameraProcess = null;
    return;
  }

  // 정상 경로: 파이썬 쪽에 STOP을 보내 로봇 안전 정지(raccoon.stop/dispose)까지
  // 수행하게 하고, 3초 내에 종료되지 않으면 강제 종료
  try {
    proc.stdin.write('STOP\n');
  } catch (_) {
    proc.kill();
    cameraProcess = null;
    return;
  }
  const killTimer = setTimeout(() => {
    if (!proc.killed) proc.kill();
  }, 3000);
  proc.once('exit', () => clearTimeout(killTimer));
  // cameraProcess는 'exit' 이벤트 핸들러에서 null 처리됨 (종료 중 재시작 방지)
}

ipcMain.handle('camera:start', () => {
  if (cameraProcess) {
    return { ok: false, message: 'already-running' };
  }
  if (!fs.existsSync(CAMERA_SCRIPT)) {
    return { ok: false, message: 'script-not-found' };
  }

  const pythonExe = resolvePython();
  // -u: stdout 무버퍼 모드 — 파이썬 로그가 종료 시점이 아니라 실시간으로 로그 창에 표시됨
  const proc = spawn(pythonExe, ['-u', CAMERA_SCRIPT], { cwd: PROJECT_ROOT });
  cameraProcess = proc;

  proc.stdout.on('data', (data) => {
    mainWindow?.webContents.send('camera:log', data.toString());
  });
  proc.stderr.on('data', (data) => {
    mainWindow?.webContents.send('camera:log', data.toString());
  });
  proc.on('exit', (code) => {
    mainWindow?.webContents.send('camera:exit', code);
    if (cameraProcess === proc) cameraProcess = null;
  });
  proc.on('error', (err) => {
    mainWindow?.webContents.send('camera:log', `[spawn error] ${err.message}\n`);
    // 실행 실패 시에도 exit 이벤트를 보내 렌더러의 실행중 상태를 원복
    mainWindow?.webContents.send('camera:exit', -1);
    if (cameraProcess === proc) cameraProcess = null;
  });

  return { ok: true, python: pythonExe };
});

ipcMain.handle('camera:stop', () => {
  stopCameraProcess();
  return { ok: true };
});

ipcMain.handle('camera:status', () => {
  return { running: !!cameraProcess };
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 종료 시 카메라 프로세스가 살아 있으면 quit을 잠시 보류하고 안전 종료(STOP)를 먼저 수행.
// 파이썬이 로봇 정지(raccoon.stop/dispose)까지 마친 뒤 종료되면 그때 앱을 종료한다.
let quitting = false;
app.on('before-quit', (event) => {
  if (quitting || !cameraProcess) return;
  event.preventDefault();
  quitting = true;
  cameraProcess.once('exit', () => app.quit());
  stopCameraProcess();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
