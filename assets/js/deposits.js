$(document).ready(function () {

    let name = localStorage.getItem('name');
    let lastName = localStorage.getItem('lastName');
    let currencyHistory = [];

    const depositHistoryFinals = {
        peso: JSON.parse(localStorage.getItem('depositHistory-peso')) || [],
        dolar: JSON.parse(localStorage.getItem('depositHistory-dolar')) || [],
        euro: JSON.parse(localStorage.getItem('depositHistory-euro')) || [],
        uf: JSON.parse(localStorage.getItem('depositHistory-uf')) || [],
        utm: JSON.parse(localStorage.getItem('depositHistory-utm')) || []
    };

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

    $('#currency').change(function() {

        const value = this.value;
        currencyHistory = JSON.parse(localStorage.getItem(`depositHistory-${value}`)) || [];
        const originalBalances = JSON.parse(localStorage.getItem('startBalances')) || [];

        if (depositHistoryFinals[value].length === 0) {
            balanceOrigin = originalBalances[value][0];
        } else {
            const lastEntry = depositHistoryFinals[value][depositHistoryFinals[value].length - 1];
            balanceOrigin = lastEntry.finalBalance;
            $('#balance').text(`Su balance es: ${balanceOrigin}`);
        }        

    });

    $('#button').click(function (e) {
        e.preventDefault();
        const currency = $('#currency').val();
    
        let amount = parseFloat($('#amount').val());
        
        let withdraw = {
            currency: currency,
            startBalance: balanceOrigin,
            amount: amount,
            date: new Date().toLocaleString(),
            finalBalance: balanceOrigin + amount,
            operation: 'transfer'
        };
    
        currencyHistory.push(withdraw);
        localStorage.setItem(`depositHistory-${currency}`, JSON.stringify(currencyHistory));
        $('#succes').removeClass('d-none')
        $('#balance').addClass('d-none');
        $('#amount').val('')        

       window.location.href = '/account.html';
    });
});

