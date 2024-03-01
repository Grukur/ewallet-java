$(document).ready(function () {
    let name = localStorage.getItem('name');
    let lastName = localStorage.getItem('lastName');

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
    
    let balanceOrigin
    let balanceTo
    let originHistory = [];
    let transferToHistory = [];     

    const depositHistoryFinals = {
        peso: JSON.parse(localStorage.getItem('depositHistory-peso')) || [],
        dolar: JSON.parse(localStorage.getItem('depositHistory-dolar')) || [],
        euro: JSON.parse(localStorage.getItem('depositHistory-euro')) || [],
        uf: JSON.parse(localStorage.getItem('depositHistory-uf')) || [],
        utm: JSON.parse(localStorage.getItem('depositHistory-utm')) || []
    };

    $('#origin').change(function() {
        $('#succes').addClass('d-none')
        $('#balance').removeClass('d-none');

        const value = this.value;
        originHistory = JSON.parse(localStorage.getItem(`depositHistory-${value}`)) || [];

        const originalBalances = JSON.parse(localStorage.getItem('startBalances')) || [];

        if (depositHistoryFinals[value].length === 0) {
            balanceOrigin = originalBalances[value][0];
            $('#balance').text(`Su balance es: ${balanceOrigin}`);
        } else {
            const lastEntry = depositHistoryFinals[value][depositHistoryFinals[value].length - 1];
            balanceOrigin = lastEntry.finalBalance;
            $('#balance').text(`Su balance es: ${balanceOrigin}`);
        }        

    });
    $('#targetTo').change(function() {
        const value = this.value;
        transferToHistory = JSON.parse(localStorage.getItem(`depositHistory-${value}`)) || [];

        const originalBalances = JSON.parse(localStorage.getItem('startBalances')) || [];

        if (depositHistoryFinals[value].length === 0) {
            balanceTo = originalBalances[value][0];
        } else {
            const lastEntry = depositHistoryFinals[value][depositHistoryFinals[value].length - 1];
            balanceTo = lastEntry.finalBalance;
        }        

    });
    $('#button').click(function (e) {
        e.preventDefault();
    
        let amount = parseFloat($('#amount').val());
        let targetTo = $('#targetTo').val();
        let origin = $('#origin').val();
        
        let deposit = {
            currency: targetTo,
            startBalance: balanceTo,
            amount: amount,
            date: new Date().toLocaleString(),
            finalBalance: balanceTo + amount,
            operation: 'transfer'
        };
    
        transferToHistory.push(deposit);
        localStorage.setItem(`depositHistory-${targetTo}`, JSON.stringify(transferToHistory));

        let withdraw = {
            currency: origin,
            startBalance: balanceOrigin,
            amount: -amount,
            date: new Date().toLocaleString(),
            finalBalance: balanceOrigin - amount,
            operation: 'transfer'
        };
    
        originHistory.push(withdraw);
        localStorage.setItem(`depositHistory-${origin}`, JSON.stringify(originHistory));
        $('#succes').removeClass('d-none')
        $('#balance').addClass('d-none');
        $('#amount').val('')
    });

});