$(document).ready(function () {
  const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}


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
      let userData = {
        "name": name,
        "lastName": lastName,
        "password": password
      };
      localStorage.setItem('usarData', JSON.stringify(userData))
      
      window.location.href = '/index.html'
    }
  });
});

