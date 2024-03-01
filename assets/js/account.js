$(document).ready(function () {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');

  let counter = localStorage.getItem("active");

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

  if (counter) {
    $('#transfers').removeClass('d-none')
    $('#lastMoves').removeClass('d-none')
  }

  $('#clear_local').click(() => {
    localStorage.clear();
    $('#sign-in_link').addClass('d-block')
    $('#account_link').removeClass('d-block')
    $('#clear_local').removeClass('d-block')
    window.location.href = '/index.html';
  })

  let originalBalances = {
    'peso': [parseFloat($('#peso-balance').text()), parseFloat($('#peso-now').text())],
    'dolar': [parseFloat($('#dolar-balance').text()), parseFloat($('#dolar-now').text())],
    'euro': [parseFloat($('#euro-balance').text()), parseFloat($('#euro-now').text())],
    'uf': [parseFloat($('#uf-balance').text()), parseFloat($('#uf-now').text())],
    'utm': [parseFloat($('#utm-balance').text()), parseFloat($('#utm-now').text())],
  };
  localStorage.setItem('startBalances', JSON.stringify(originalBalances));

  let startBalances = JSON.parse(localStorage.getItem('startBalances')) || [];

  $('#deposits').click(function () {
    let active = 'activo'
    localStorage.setItem('active', JSON.stringify(active))
    window.location.href = '/deposits.html';

  });

  $('#lastMoves').click(function () {
    window.location.href = '/lastMoves.html';
  })

  $('#transfers').click(function () {
    localStorage.setItem('startBalances', JSON.stringify(originalBalances));
    window.location.href = '/transfers.html';
  })


  // Bring each currency data
  const depositHistoryFinals = {
    peso: JSON.parse(localStorage.getItem(['depositHistory-peso'])) || [],
    dolar: JSON.parse(localStorage.getItem(['depositHistory-dolar'])) || [],
    euro: JSON.parse(localStorage.getItem(['depositHistory-euro'])) || [],
    uf: JSON.parse(localStorage.getItem(['depositHistory-uf'])) || [],
    utm: JSON.parse(localStorage.getItem(['depositHistory-utm'])) || []
  };

  // Render values from local
  const balances = {};
  const oprationAmount = {};
  let operationType = {};

  for (const currency in depositHistoryFinals) {
    const currencyDeposits = depositHistoryFinals[currency];

    if (currencyDeposits.length > 0) {

      const lastDeposit = currencyDeposits[currencyDeposits.length - 1];
      balances[currency] = lastDeposit.finalBalance;
      oprationAmount[currency] = lastDeposit.amount;
      operationType[currency] = lastDeposit.operation;
      operationType[currency] = operationType[currency].charAt(0).toUpperCase() + operationType[currency].slice(1);
    } else {

      balances[currency] = startBalances[currency][0];
      oprationAmount[currency] = 0;
      operationType[currency] = 'Sin operaciones';
    }

    $(`#${currency}-balance`).text(balances[currency]);
    $(`#${currency}-now`).text(oprationAmount[currency]);
    $(`#${currency}-operation`).text(operationType[currency]);
  }
});

