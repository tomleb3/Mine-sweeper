'use strict';

function openNav() {
    document.querySelector('.sidenav').style.width = '250px';
    // document.querySelector('.sidenav').classList.add('open');
}

function closeNav() {
    document.querySelector('.sidenav').style.width = 0;
    // document.querySelector('.sidenav').classList.remove('open');
}