export default class FinanceService {
    
getServerData = async () => {
    try {
        const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        return res.json();
    } catch (error) {
        console.log(error)
    }
}
getExchangeRates = (rates) => {
    let USDrate = rates.Valute.USD.Value.toFixed(2).replace('.', ',');
    let USDratePrev = rates.Valute.USD.Previous.toFixed(4).replace('.', ',');
    let EURrate = rates.Valute.EUR.Value.toFixed(2).replace('.', ',');
    let EURratePrev = rates.Valute.EUR.Previous.toFixed(4).replace('.', ',');
    return {USDrate,USDratePrev, EURrate, EURratePrev}
}
trend = (current, previous) => {
    if (current > previous) return true;
    if (current < previous) return false;
}

currencyConventer = (incomeCurrency, operationCurrency, amount, EURrate, USDrate) => {
    EURrate = parseFloat(EURrate.replace(',', '.'))
    USDrate = parseFloat(USDrate.replace(',', '.'))
    
    if (operationCurrency === incomeCurrency) {
        return new Promise((resolve, reject) => {
            return resolve({value: parseInt(amount), rate: 1})
        })
    }

    let promise = new Promise ((resolve, reject) => {
            if (operationCurrency !== incomeCurrency) {
                if (operationCurrency === 'RUB') {
                    switch (incomeCurrency) {
                        case 'EUR':
                            return resolve({value: amount/EURrate, rate: EURrate});
                        case 'USD':
                            return resolve({value: amount/USDrate, rate: USDrate});
                        default:
                            return resolve({value:amount, rate: 1})
                    }
                } else if (operationCurrency === 'EUR') {
                    switch (incomeCurrency) {
                        case 'RUB':
                            return resolve({value: amount*EURrate, rate: 1/EURrate });
                        case 'USD':
                            return resolve({value: amount*USDrate/EURrate, rate: EURrate/USDrate});
                        default:
                            return resolve({value:amount, rate: 1})
                    }
                } else if (operationCurrency === 'USD') {
                    switch (incomeCurrency) {
                        case 'EUR':
                            return resolve({value: amount*EURrate/USDrate, rate: USDrate/EURrate});
                        case 'RUB':
                            return resolve({value: amount*USDrate, rate: 1/USDrate});
                        default:
                            return resolve({value:amount, rate: 1})
                    }
                }
            }
    })
    return promise
}

// calcDeposit

calcIncomeChange = (oldBalance, amount, type) => {
    amount = parseFloat(amount);
    let promise = new Promise ((resolve, reject) => {
        let newBalance = 0;
        if (type) {
            return resolve(newBalance = oldBalance + amount)
        }  else {
                newBalance = oldBalance - amount
                if (newBalance < 0) {
                    reject('Not enough money on this income')
                }
                return resolve(newBalance)
        }
    })
    return promise 
}

}
