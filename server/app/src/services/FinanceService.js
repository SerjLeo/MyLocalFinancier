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
    EURrate = this.convertToFloat(EURrate)
    USDrate = this.convertToFloat(USDrate)
    amount = this.convertToFloat(amount)
    if (operationCurrency === incomeCurrency) {
        return new Promise((resolve, reject) => {
            return resolve({value: amount, rate: 1})
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
                            return resolve({value: amount*EURrate/USDrate, rate: EURrate/USDrate});
                        default:
                            return resolve({value:amount, rate: 1})
                    }
                } else if (operationCurrency === 'USD') {
                    switch (incomeCurrency) {
                        case 'EUR':
                            return resolve({value: amount*USDrate/EURrate, rate: USDrate/EURrate});
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

convertToFloat(number) {
    if(typeof(number) === 'string') {
        return Number(parseFloat(number.replace(',', '.')).toFixed(2))
    } else if(typeof(number) === 'number') {
        return Number(parseFloat(number).toFixed(2))
    } else {
        return null
    }
}

calcBalance = (oldBalance, amount, type = true) => {
    amount = this.convertToFloat(amount);
    oldBalance = this.convertToFloat(oldBalance);
    let promise = new Promise ((resolve, reject) => {
        let newBalance = 0;
        if (type) {
            newBalance = oldBalance + amount
            return resolve(newBalance)
        }  else {
            newBalance = oldBalance - amount
            if (newBalance < 0) {
                reject('Insufficient funds in the account')
            }
            return resolve(newBalance)
        }
    })
    return promise 
}

}
