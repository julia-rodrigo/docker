describe('Testing function: sendDetails(data)... ', function () {
    // positive test case
    it('1 Wrong parameter', function () {
        expect(sendDetails({
            "76": "",
            "pageNr": "8"
            })).toEqual([ "76: This parameter doesn't exist" ]);
    })
    it('2 Correct parameter, return empty string', function() {
        expect(sendDetails({
            "pageNr": "a"
            })).toEqual([ "No errors" ]);
    })
    it('3 Two same wrong parameters', function () {
        expect(sendDetails({
            "pageN": "20",
            "pageNr": "8",
            "pageN": "20"
            })).toEqual([ "pageN: This parameter doesn't exist" ]);
    })
    it('4 Three right parameters', function () {
        expect(sendDetails({
            "pageNr": "20",
            "pageNr": "8",
            "pageNr": "20"
            })).toEqual([ "No errors" ]);
    })
    it('5 Non-string parameter', function () {
        expect(sendDetails({
            pageNr: "8"
            })).toEqual([ "No errors" ]);
    })
})

