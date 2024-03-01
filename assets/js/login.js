const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
$(document).ready(function () {

  $('form').submit(function (event) {
    event.preventDefault();

    let name = $('#name').val();
    let password = $('#password').val();
    console.log(name, password)

    if(password === '222' && name === 'Darold'){     
      localStorage.setItem('name', name);
      localStorage.setItem('lastName', 'Trench');
      window.location.href = '/index.html';
    }else{
      alert('Clave incorrecta')
    }
  });
});

