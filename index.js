const { app, BrowserWindow } = require('electron');

function createWindow () {
  
  const win = new BrowserWindow({
    width: 410,
    height: 730,
    frame: false,
    icon: __dirname + './public/img/icon.ico',
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('public/index.html')
  
  win.setMenu(null);
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('web-contents-created', (e, contents) => {
  contents.on('new-window', (e, url) => {
    e.preventDefault();
    require('open')(url);
  });
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) e.preventDefault(), require('open')(url);
  });
});