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
        return {USDrate, USDratePrev, EURrate, EURratePrev}
    }

    trend = (current, previous) => {
        if (current > previous) return true;
        if (current < previous) return false;
    }

    convertToFloat(data) {
        if(typeof(data) === 'string') {
            if(isNaN(Number(data.replace(',', '.')))) {
                return 0
            }
            return Math.abs(Number(parseFloat(data.replace(',', '.')).toFixed(2)))
        } else if(typeof(data) === 'number') {
            return Math.abs(Number(parseFloat(data).toFixed(2)))
        } else {
            return 0
        }
    }

    calcBalance(oldBalance, amount, type = true) {
        amount = this.convertToFloat(amount);
        oldBalance = this.convertToFloat(oldBalance);
        let newBalance
        if (type) {
            newBalance = oldBalance + amount
        }  else {
            newBalance = oldBalance - amount
            if (newBalance < 0) {
                throw Error('negativeBalance')
            }
        }
        return this.convertToFloat(newBalance)
    }
}
