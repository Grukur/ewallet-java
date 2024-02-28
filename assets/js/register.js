
/* Capturando los datos del form */
$(document).ready(function () {
  // Tu código jQuery aquí


  $('form').submit(function (event) {
    event.preventDefault();

    let name = $('#name').val();
    let lastName = $('#lastName').val();
    let password = $('#password_1').val();
    let password2 = $('#password_2').val();

    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      $('#password_1').val('');
      $('#password_2').val('');
    } else {
      $('#name').text(name); // Asignar el nombre de usuario al elemento h2
      $('#lastName').text(lastName); // Asignar el nombre de usuario al elemento h2
      window.location.href = '/index.html?name=' + encodeURIComponent(name) + '&lastName=' + encodeURIComponent(lastName);
    }
  });
});

