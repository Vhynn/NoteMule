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

    win.loadFile('index.html')

    win.webContents.openDevTools()
    
});