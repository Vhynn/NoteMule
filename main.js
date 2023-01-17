//const Quill = require('quill');
//const wordList = require('./WordList');
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {

    const win = new BrowserWindow({
        width: 600,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    win.loadFile('index.html')

    //win.webContents.openDevTools()
    
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})