const electron = require('electron')
const path = require('path')
const axios = require('axios');
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
        
        if (document.getElementById('username').value == 'TEST' &&
            document.getElementById('password').value == 'TEST')
        {
            /*
            let myNotification = new window.Notification('Login', {
                body: 'Welcome TEST!'
            })
            */
            ipc.send('login-ok-notify', "")            
        }
        else
        {
            axios.post('http://127.0.0.1/ArchiflowService/Login.svc/json/login', {
                strUser:document.getElementById('username').value, 
                strPassword:document.getElementById('password').value, 
                oConnectionInfo: {
                    Language:"0",
                    DateFormat:"dd/mm/yyyy",
                    WorkflowDomain:"siav"
                }
            })
            .then(res => {            
                const connectionstring = res.data.oSessionInfo.SessionId
                if(connectionstring != '')
                {
                    ipc.send('login-ok-notify', connectionstring)
                    
                    /*                
                    document.getElementById('loaderDiv').style.display = 'none'
                    let myNotification = new window.Notification('test', {
                        body: 'test'
                    })
                    */
                }
                else
                {
                    loginError()        
                }
            })  
            .catch(loginError)
        }
    }, 1);   
})

//Login Error function
function loginError()
{
    document.getElementById('loaderDiv').style.display = 'none'
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''

    $('.flash')
        .show()
        .animate({opacity: 0.5}, 300) 
        .fadeOut(300)
        .css({'opacity': 1})

    document.getElementById('username').focus()
}
  