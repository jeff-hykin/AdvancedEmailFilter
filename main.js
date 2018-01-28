// requirements 
const { app , BrowserWindow , Menu } = require('electron')
require('electron-debug')({showDevTools: true})
const path = require('path')
global.auth = {email: null, password: null}; // Global authentication object to store email and password


function log(...things)
        {
            // if the first input is a string, and there is only 1 input
            if (typeof(things[0]) == "string" && things.length == 1)
                {
                    // if the input starts with "var:"
                    if (things[0].search(/^var:.+$/) > -1)
                        {
                            variable_name = things[0].slice(4)
                            
                            output_after_indent = eval('(`${'+variable_name+'}`).replace(/\\n/g,"\\n    ")')
                            // if the variable's data contains no newlines, then output it on the same line
                            if (output_after_indent.search(/\n/) == -1)
                                {
                                    console.log(variable_name+":",output_after_indent)
                                }
                            // if the output does contain newlines, then put it on a seperate line 
                            else 
                                {
                                    console.log(variable_name,":\n",output_after_indent)
                                }
                            // end the function 
                            return
                        }
                }
            // put things on the console whether or not they're being called from html
            console.log.apply(this, things)
        }
    




// globals
let mainWindow

app.on('ready', () => 
    {
        log("main.js: app is ready")
        mainWindow = new BrowserWindow({icon:__dirname+'/logo.png'}/*{titleBarStyle: 'hiddenInset'}*/);
        log("main.js: created new window")
        mainWindow.loadURL(path.join('file://', __dirname, 'intro/index.html'))
        log("main.js: loaded intro/index")
        mainWindow.show()
        log("main.js: finished showing window")
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

log("main.js: end of running main.js")