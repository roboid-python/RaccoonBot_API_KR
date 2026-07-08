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

function stopCameraProcess() {
  if (cameraProcess && !cameraProcess.killed) {
    cameraProcess.kill();
    cameraProcess = null;
  }
}

ipcMain.handle('camera:start', () => {
  if (cameraProcess) {
    return { ok: false, message: 'already-running' };
  }
  if (!fs.existsSync(CAMERA_SCRIPT)) {
    return { ok: false, message: 'script-not-found' };
  }

  const pythonExe = resolvePython();
  cameraProcess = spawn(pythonExe, [CAMERA_SCRIPT], { cwd: PROJECT_ROOT });

  cameraProcess.stdout.on('data', (data) => {
    mainWindow?.webContents.send('camera:log', data.toString());
  });
  cameraProcess.stderr.on('data', (data) => {
    mainWindow?.webContents.send('camera:log', data.toString());
  });
  cameraProcess.on('exit', (code) => {
    mainWindow?.webContents.send('camera:exit', code);
    cameraProcess = null;
  });
  cameraProcess.on('error', (err) => {
    mainWindow?.webContents.send('camera:log', `[spawn error] ${err.message}\n`);
    cameraProcess = null;
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
  stopCameraProcess();
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  stopCameraProcess();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
