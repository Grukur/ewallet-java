
/* Capturando los datos del form */
$(document).ready(function () {
  // Tu código jQuery aquí


  $('form').submit(function (event) {
    event.preventDefault();

    let name = $('#name').val();
    let password = $('#password').val();
    console.log(name, password)

    if(password === '222'){     
      localStorage.setItem('name', name);
      localStorage.setItem('lastName', 'Trench');
      window.location.href = '/index.html';
    }else{
      alert('Clave incorrecta')
    }
  });
});

