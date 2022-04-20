describe('Testing function: hasCharacter(data)... ', function () {
    // positive test case
    it('1 has String characters, expects true ', function () {
        expect(hasCharacters('hi')).toBe(true);
    })
    it('2 has Numbers, expects false', function() {
        expect(hasCharacters(1)).toBe(false);
    })
    // negative test case
    it('3 has String characters with a number, expect true', function() {
        expect(hasCharacters("h4")).toBe(true);
    })
    it('4 takes in a number as a string, expect false', function() {
        expect(hasCharacters("1")).toBe(false);
    })

    // social characters
    it('5 has an empty String, false', function() {
        expect(hasCharacters("")).toBe(false);
    })
    it('6 has special foreign characters', function() {
        expect(hasCharacters("Σὲ γνωρίζω ἀπὸ τὴν κόψη")).toBe(true);
    })
    it('6 has special symbols', function() {
        expect(hasCharacters("?")).toBe(true);
    })
})

