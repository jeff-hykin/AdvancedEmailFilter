// requirements 
const { app , BrowserWindow , Menu } = require('electron')
require('electron-debug')({showDevTools: true})
const path = require('path')





// globals
let mainWindow

app.on('ready', () => 
    {
    
        mainWindow = new BrowserWindow({icon:__dirname+'/logo.png'}/*{titleBarStyle: 'hiddenInset'}*/);
        mainWindow.loadURL(path.join('file://', __dirname, 'intro/index.html'))
        mainWindow.show()


        // Check if on a Mac
        if (process.platform === 'darwin') 
            {
                // Create our menu entries so that we can use the shortcuts
                Menu.setApplicationMenu(
                        Menu.buildFromTemplate(
                            [
                                {
                                    label: 'FAME',
                                    submenu: 
                                    [
                                        { role: 'quit' },
                                    ]
                                },
                                {
                                    label: 'Edit',
                                    submenu: 
                                    [
                                        { role: 'undo' },
                                        { role: 'redo' },
                                        { type: 'separator' },
                                        { role: 'cut' },
                                        { role: 'copy' },
                                        { role: 'paste' },
                                        { role: 'pasteandmatchstyle' },
                                        { role: 'delete' },
                                        { role: 'selectall' }
                                    ]
                                },
                                {
                                    label: 'View',
                                    submenu: 
                                    [
                                        { role: 'togglefullscreen' },
                                    ]
                                },
                                {
                                    label: 'Window',
                                    submenu: 
                                    [
                                        { role: 'minimize' },
                                    ]
                                }
                            ]))
            } // end "if mac"
    }) // end app on-ready

// when all the GUI windows are closed  // quit the app 
app.on('window-all-closed', () =>      { app.quit() }   )

// if the app is started/clicked   // and there is no active window    // then create a window
app.on('activate', () =>     {     if (mainWindow === null)             { createWindow() }      }    )
