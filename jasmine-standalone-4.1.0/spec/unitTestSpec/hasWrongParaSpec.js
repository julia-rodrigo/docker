describe('Testing function: hasWrongParameters(data)... ', function () {
    // positive test case
    it('1 Wrong parameter', function () {
        expect(hasWrongParameters({
            "76": "",
            "pageNr": "8"
            })).toBe(true);
    })
    it('2 Correct parameter, return empty string', function() {
        expect(hasWrongParameters({
            "pageNr": "a"
            })).toBe(false);
    })
    it('3 Two same wrong parameters', function () {
        expect(hasWrongParameters({
            "pageN": "20",
            "pageNr": "8",
            "pageN": "20"
            })).toBe(true);
    })
    it('4 Three right parameters', function () {
        expect(hasWrongParameters({
            "pageNr": "20",
            "pageNr": "8",
            "pageNr": "20"
            })).toBe(false);
    })
    it('5 Non-string parameter', function () {
        expect(hasWrongParameters({
            pageNr: "8"
            })).toBe(false);
    })
})

