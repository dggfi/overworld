import { app, BrowserWindow, globalShortcut, Menu, MenuItem } from 'electron';
// import electronReload from 'electron-reload';
// electronReload(__dirname, {});
// Electron magic constants
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Window
const createWindow = async (): Promise<void> => {
  // Shortcuts
  globalShortcut.register('CommandOrControl+Shift+E', () => {
    app.quit();
  })
  globalShortcut.register('CommandOrControl+Shift+C', () => {
    mainWindow.webContents.toggleDevTools();
  })

  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();
};

// Menu
// Menu.setApplicationMenu(null);
const menu = new Menu();
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Hello, world!') }
  }]
}))
menu.append(new MenuItem({
  
}))
Menu.setApplicationMenu(menu);


// App events
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // OS X behavior
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
