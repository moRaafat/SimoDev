const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('exitBtn')
const loginForm = document.getElementById('loginForm')

//Init jquery
window.$ = window.jQuery = require('jquery');

//Exit event listener
closeBtn.addEventListener('click', function (event) {
    ipc.send('exit-notify')    
})

//Submit event listener
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('loaderDiv').style.display = 'inline'

    setTimeout(function(){
        if (document.getElementById('username').value == document.getElementById('password').value)
            ipc.send('login-ok-notify', 'connectionstring')
        else
        {
            document.getElementById('loaderDiv').style.display = 'none'
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''

            $('.flash')
                .show()
                .animate({opacity: 0.5}, 300) 
                .fadeOut(300)
                .css({'opacity': 1})            
        }
    }, 500);   
})

  