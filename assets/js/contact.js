$(document).ready(function () {
    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');

    if (name && lastName) {
        $('#username').text(`Bienvenido ${name} ${lastName}`);
        $('#sign-in_link-1, #sign-in_link-2').addClass('d-none')
        $('#account_link').removeClass('d-none')
        $('#clear_local-1, #clear_local-2').removeClass('d-none')
    } else {
        console.log('No hay usuario');
    }

    $('#clear_local-1, #clear_local-2').click(() => {
        localStorage.clear();
        $('#sign-in_link-1, #sign-in_link-2').addClass('d-block')
        $('#account_link').removeClass('d-block')
        $('#clear_local-1, #clear_local-2').removeClass('d-block')
        window.location.href = '/index.html';
    })  

    $('#clear_local').click(() => {
        localStorage.clear();
        $('#sign-in_link').addClass('d-block')
        $('#account_link').removeClass('d-block')
        $('#clear_local').removeClass('d-block')
        window.location.href = '/index.html';
    })    
});