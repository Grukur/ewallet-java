$(document).ready(function () {
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');

  if (name && lastName) {
    $('#username').text(`Bienvenido ${name} ${lastName}`);
    $('#sign-in_link').addClass('d-none')
    $('#account_link').removeClass('d-none')
    $('#clear_local').removeClass('d-none')
  } else {
    console.log('No hay usuario');
  }

  $('#clear_local').click(() => {
    localStorage.clear();
    $('#sign-in_link').addClass('d-block')
    $('#account_link').removeClass('d-block')
    $('#clear_local').removeClass('d-block')
    window.location.href = '/index.html';
  })

  const depositHistoryFinals = {
    peso: JSON.parse(localStorage.getItem(['depositHistory-peso'])) || [],
    dolar: JSON.parse(localStorage.getItem(['depositHistory-dolar'])) || [],
    euro: JSON.parse(localStorage.getItem(['depositHistory-euro'])) || [],
    uf: JSON.parse(localStorage.getItem(['depositHistory-uf'])) || [],
    utm: JSON.parse(localStorage.getItem(['depositHistory-utm'])) || []
  };

  const currencys = ['peso', 'dolar', 'euro', 'uf', 'utm']

  const depositList = $('#lastMovesPerCurrency');
  depositList.empty();

  let lastCurrency;

  // comenzamos validaciones pre renderizado y renderizado
  for (let i = 0; i < currencys.length; i++) {
    const currency = currencys[i];
    const history = depositHistoryFinals[currency];
    const capitalizedCurrency = currency.charAt(0).toUpperCase() + currency.slice(1);

    if (currency !== lastCurrency) {
      const heading = `<h6 class="bg-primary bg-opacity-10"><strong>${capitalizedCurrency}</strong></h6>`;
      depositList.append(heading);
      lastCurrency = currency;
    }

    for (let i = 0; i < history.length; i++) {
      const startBalance = history[i]['startBalance'][0] !== undefined ? history[i]['startBalance'][0] : history[i]['startBalance'];
      let operation = history[i]['operation']
      operation = operation.charAt(0).toUpperCase() + operation.slice(1);

      const listItem = `<li>
        ${capitalizedCurrency} - 
        Balance inicial ${startBalance} - 
        ${operation} ${history[i]['amount']} - 
        Balance final ${history[i]['finalBalance']} - 
        ${history[i]['date']}</li>`;
    
      depositList.append(listItem);
    }
  }
});
