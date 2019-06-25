const readline = require('readline');


//Common variable declaration
const commission = {
    W: 0.15,
    P: 0.12,
    E: 0.18
};
let _totalBet = [];
let _result = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const _products = Object.keys(commission);


//Command line interface
rl.question('Insert bet information in the given format (copy from bet.text file)', (value) => {
    _totalBet = value.split(" ");
    rl.question('Insert result information in the given format (copy from result.text file)', (value) => {
        _result = value;
        rl.close();
        for (item of _products) {
            calculateTote(_totalBet, _result, item);
        }
    });
});




/**
 * Extract Win Stake from the Bet Information by calling common function
 * @param {*} _totalBet
 */
const extractWinData = (_totalBet) => {
    return _totalBet.filter(item => (item.match(/^Bet:W/g) !== null));
}


/**
 * Extract Place Stake from the Bet Information by calling common function
 * @param {*} _totalBet
 */
const extractPlaceData = (_totalBet) => {
    return _totalBet.filter(item => (item.match(/^Bet:P/g) !== null));
}


/**
 * Extract Exacta Stake from the Bet Information by calling common function
 * @param {*} _totalBet
 */
const extractExactaData = (_totalBet) => {
    return _totalBet.filter(item => (item.match(/^Bet:E/g) !== null));
}


/**
 * 
 * @param {*} _winData 
 * @param {*} _result 
 * @param {*} _products 
 */
const calculateTote = (_betData, _result, _product) => {
    let extractData = [];
    let stakeValue = 0;
    let _targetResult = ''

    try {
        _quickValidation(_betData, _result);
        switch (_product) {
            case 'W':
                _targetResult = _result.split(":")[1];
                extractData = extractWinData(_betData);
                stakeValue = filterResults(extractData, _targetResult, _product, 1);
                console.log("Win:" + _targetResult + ":$" + stakeValue);
                break;
            case 'P':
                _targetResult = _result.split(":");
                extractData = extractPlaceData(_betData);
                for (let i = 1; i < _targetResult.length; i++) {
                    stakeValue = filterResults(extractData, _targetResult[i], _product, 3);
                    console.log("Place:" + _targetResult[i] + ":$" + stakeValue);

                }
                break;
            case 'E':
                _targetResult = _result.split(":")[1] + ',' + _result.split(":")[2];
                extractData = extractExactaData(_betData);
                stakeValue = filterResults(extractData, _targetResult, _product, 1);
                console.log("Exacta:" + _targetResult + ":$" + stakeValue);
                break;
        }
    } catch (e) {
        console.log(e);
        process.exit();
    }

}


/**
 * 
 * @param {*} _extractData 
 * @param {*} _result 
 * @param {*} _product 
 * @param {*} _dividend 
 */
const filterResults = (_extractData, _result, _product, _dividend) => {
    try {
        let totalBetCount = 0;
        let totalResultCount = 0;
        let _extractResult = extractResult(_extractData, _result);
        _extractData.map(item => totalBetCount += +item.split(":")[3]) //Stake
        _extractResult.map(item => totalResultCount += +item.split(":")[3]);
        return (((totalBetCount - (totalBetCount * commission[_product])) / totalResultCount) / _dividend).toFixed(2);
    } catch (err) {
        console.log(err);
        process.exit()
    }
}


const extractResult = (_extractData, _res) => {
    return _total = _extractData.filter(item => item.split(":")[2] == _res);
}


const _quickValidation = (_betData, _result) => {
    try {
      
        if (_betData.filter(item => (item.match(/^Bet/) === null)).length) //Throw error if not Start with Bet   
            throw ("Invalid Bet data, data should start with Bet");

        if (_betData.filter(item => (item.split(":").length !== 4)).length)
            throw ("Invalid Bet data, data should have proper length");

        if (_result.match(/^Result/) === null) //Throw error if not Start with Bet   
            throw ("Invalid Result data, it should start with Result");

        if (_result.split(":").length !== 4)
            throw ("Invalid Result data, it should have proper length");

    } catch (e) {
        console.log(e);
        process.exit()
    }
}

module.exports = {
    commission,
    extractWinData,
    extractPlaceData,
    extractExactaData,
    calculateTote,
    extractResult,
    filterResults
}