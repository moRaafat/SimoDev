const electron = require('electron')
const path = require('path')

const Anchor_Users = document.getElementById("a_users");
const Anchor_Offices = document.getElementById("a_offices");
const Anchor_Groups = document.getElementById("a_groups");

Anchor_Users.addEventListener('click', function (event) {
    event.preventDefault();
    let users_pan = document.getElementById("users-panel");
    users_pan.innerHTML = "<ul><li>Mario Rossi</li><li>Antonio Verdi</li></ul>"
    window.location = this.href;
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
    users_pan.innerHTML = "<ul><li>Gruppo 1</li><li>Gruppo 2</li></ul>"
    window.location = this.href;
})
