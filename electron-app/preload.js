const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('robotAPI', {
  startCamera: () => ipcRenderer.invoke('camera:start'),
  stopCamera: () => ipcRenderer.invoke('camera:stop'),
  getStatus: () => ipcRenderer.invoke('camera:status'),
  onLog: (callback) => ipcRenderer.on('camera:log', (_event, data) => callback(data)),
  onExit: (callback) => ipcRenderer.on('camera:exit', (_event, code) => callback(code))
});
