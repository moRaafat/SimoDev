const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let top
let child

function createWindow () {
    // Create the browser window.
    top = new BrowserWindow({width: 800, height: 600, show:false})

    // and load the index.html of the app.
    top.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    //top.webContents.openDevTools()

    // Emitted when the window is closed.
    top.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        top = null
    })

    //Top menu
    var menu = Menu.buildFromTemplate([
    {
        label:'Menu',
        submenu:[
        {
            label:'Test'
        },
        {type:'separator'},
        {
            label:'Exit',
            click(){
                app.quit()
            }
        }
        ]
    },    
    {
        label:'Info',
        submenu:[
        {
            label:'Debug',
            click(){
                // Open the DevTools.
                top.webContents.openDevTools()
            }
        },
        {
            role: 'reload'
        }
        ]
    }
    ])
    Menu.setApplicationMenu(menu)

    //Child window
    child = new BrowserWindow({
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        width: 400, 
        height: 430,
        parent: top, 
        modal: true, 
        show: false
    })    
    child.loadURL(url.format({
        pathname: path.join(__dirname, 'src/login.html'),
        protocol: 'file:',
        slashes: true
    }))

    child.once('ready-to-show', () => {
        child.show()
    })
    
    child.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        child = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (top === null) {
        createWindow()
    }
})

//Exit notification
ipc.on('exit-notify', function (event, arg) {
    child.close()
    top.close()
})

//Login OK notification
ipc.on('login-ok-notify', function (event, arg) {
    child.close()
    top.show()
})
