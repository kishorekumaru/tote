const {
    extractWinData,
    extractPlaceData,
    extractExactaData,
    extractResult,
    filterResults
} = require('./index');

const totalBet = ["Bet:W:1:3", "Bet:W:2:4", "Bet:W:3:5", "Bet:W:4:5", "Bet:W:1:16", "Bet:W:2:8", "Bet:W:3:22", "Bet:W:4:57", "Bet:W:1:42",
    "Bet:W:2:98", "Bet:W:3:63", "Bet:W:4:15", "Bet:P:1:31", "Bet:P:2:89", "Bet:P:3:28", "Bet:P:4:72", "Bet:P:1:40", "Bet:P:2:16", "Bet:P:3:82",
    "Bet:P:4:52", "Bet:P:1:18", "Bet:P:2:74", "Bet:P:3:39", "Bet:P:4:105", "Bet:E:1,2:13", "Bet:E:2,3:98", "Bet:E:1,3:82", "Bet:E:3,2:27", "Bet:E:1,2:5",
    "Bet:E:2,3:61", "Bet:E:1,3:28", "Bet:E:3,2:25", "Bet:E:1,2:81", "Bet:E:2,3:47", "Bet:E:1,3:93", "Bet:E:3,2:51"
]
const result = ["Result:2:3:1"]


test('Extract Win pool from totalBet', () => {
    let winBet = ["Bet:W:1:3", "Bet:W:2:4", "Bet:W:3:5", "Bet:W:4:5", "Bet:W:1:16", "Bet:W:2:8",
        "Bet:W:3:22", "Bet:W:4:57", "Bet:W:1:42", "Bet:W:2:98", "Bet:W:3:63", "Bet:W:4:15"
    ];
    expect(extractWinData(totalBet)).toEqual(winBet)
})

test('Extract Place pool from totalBet', () => {
    let winPlace = ["Bet:P:1:31", "Bet:P:2:89", "Bet:P:3:28", "Bet:P:4:72", "Bet:P:1:40",
        "Bet:P:2:16", "Bet:P:3:82", "Bet:P:4:52", "Bet:P:1:18", "Bet:P:2:74", "Bet:P:3:39", "Bet:P:4:105"
    ];
    expect(extractPlaceData(totalBet)).toEqual(winPlace)
})

test('Extract Exacta pool from totalBet', () => {
    let winExacta = ["Bet:E:1,2:13", "Bet:E:2,3:98", "Bet:E:1,3:82", "Bet:E:3,2:27", "Bet:E:1,2:5",
        "Bet:E:2,3:61", "Bet:E:1,3:28", "Bet:E:3,2:25", "Bet:E:1,2:81", "Bet:E:2,3:47", "Bet:E:1,3:93", "Bet:E:3,2:51"
    ];
    expect(extractExactaData(totalBet)).toEqual(winExacta)
})


test('Filter win or place bets value based on the result ', () => {
    let _winData = extractWinData(totalBet);
    let _winResult = ["Bet:W:2:4", "Bet:W:2:8", "Bet:W:2:98"]
    expect(extractResult(_winData, 2)).toEqual(_winResult);
})

test('Filter win bets value based on the result ', () => {
    let _exactaData = extractExactaData(totalBet);
    let _winResult = ["Bet:E:2,3:98", "Bet:E:2,3:61", "Bet:E:2,3:47"]
    expect(extractResult(_exactaData, '2,3')).toEqual(_winResult);
})


test('Calcaulte the filter result data for each dividends', () => {
    let _winData = extractWinData(totalBet);
    expect(filterResults(_winData, 2, 'W', 1)).toBe('2.61');
})

test('Calcaulte the filter result data for each dividends', () => {
    let _placeData = extractPlaceData(totalBet);
    expect(filterResults(_placeData, 2, 'P', 3)).toBe('1.06');
})

test('Calcaulte the filter result data for each dividends', () => {
    let _placeData = extractPlaceData(totalBet);
    expect(filterResults(_placeData, 3, 'P', 3)).toBe('1.27');
})

test('Calcaulte the filter result data for each dividends', () => {
    let _placeData = extractPlaceData(totalBet);
    expect(filterResults(_placeData, 1, 'P', 3)).toBe('2.13');
})

test('Calcaulte the filter result data for each dividends', () => {
    let _placeData = extractExactaData(totalBet);
    expect(filterResults(_placeData, '2,3', 'E', 1)).toBe('2.43');
})