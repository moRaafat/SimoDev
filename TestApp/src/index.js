const electron = require('electron')
const path = require('path')
const axios = require('axios');
const ipc = electron.ipcRenderer

// Global reference to connection string
let connectionString = ''

const Anchor_Users = document.getElementById("a_users");
const Anchor_Offices = document.getElementById("a_offices");
const Anchor_Groups = document.getElementById("a_groups");

Anchor_Users.addEventListener('click', function (event) {
    event.preventDefault();
    let users_pan = document.getElementById("users-panel");
    
    axios.post('http://127.0.0.1/ArchiflowService/chart.svc/json/getusers', {
        strSessionId:connectionString
    })
    .then(res => {
        users_pan.innerHTML = ""
        if(res.data.oUsers != null)
        {            
            var arrayLength = res.data.oUsers.length;
            if(arrayLength > 0)
            {
                var strInner = "<ul>"
                for (var i = 0; i < arrayLength; i++) {
                    strInner += "<li>"
                    strInner += res.data.oUsers[i].Name
                    strInner += "</li>"
                }
                strInner += "</ul>"
                users_pan.innerHTML = strInner            
            }
        } 
        
        window.location = this.href;
    })  
    .catch(res => {
        users_pan.innerHTML = ""
        window.location = this.href;
    })
})

Anchor_Offices.addEventListener('click', function (event) {
    event.preventDefault();
    let users_pan = document.getElementById("offices-panel");
    users_pan.innerHTML = "<ul><li>Amministrazione</li><li>Sviluppo</li><li>Marketing</li></ul>"
    window.location = this.href;
})

Anchor_Groups.addEventListener('click', function (event) {
    event.preventDefault();
    let users_pan = document.getElementById("groups-panel");
    
    axios.post('http://127.0.0.1/ArchiflowService/chart.svc/json/getGroups', {
        strSessionId:connectionString
    })
    .then(res => {
        users_pan.innerHTML = ""
        if(res.data.oGroups != null)
        {            
            var arrayLength = res.data.oGroups.length;
            if(arrayLength > 0)
            {
                var strInner = "<ul>"
                for (var i = 0; i < arrayLength; i++) {
                    strInner += "<li>"
                    strInner += res.data.oGroups[i].Name
                    strInner += "</li>"
                }
                strInner += "</ul>"
                users_pan.innerHTML = strInner            
            }
        } 
        
        window.location = this.href;
    })  
    .catch(res => {
        users_pan.innerHTML = ""
        window.location = this.href;
    })
})

//Connection String notification
ipc.on('connection-string-notify', function (event, arg) {
    connectionString = arg
})