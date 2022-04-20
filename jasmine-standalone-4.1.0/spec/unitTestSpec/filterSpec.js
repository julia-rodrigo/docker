describe('Testing function: filter(set, toFilter)...takes in a set and an array ', function () {
    // positive test case
    it('1 Filter parameter correctly, return empty', function () {
        expect(filter(
            new Set([ "hello" ]), 
            [ "hello" ]
        )).toEqual( new Set() );
    })

    it('2 No parameter/ empty array in the set correctly', function () {
        expect(filter(
            new Set([ ]),
            [ "hello" ]
        )).toEqual( new Set() );
    })

    it('3 Filter parameter correctly', function () {
        expect(filter(
            new Set([ "dog", "mouse", "cat" ]), 
            [ "hello", "cat", "mouse"]
        )).toEqual( new Set(["dog"]) );
    })
    
    it('4 Filter parameter correctly, return empty', function () {
        expect(filter(
            new Set([ "one sheep", "two sheep", "...", "a wolf", "two sheep" ]), 
            [ "sheep", "a wolf", "two sheep" ]
        )).toEqual( new Set( ["one sheep", "..."] ) );
    })

    it('5 Filter parameter correctly, return non-string numebr', function () {
        expect(filter(
            new Set([ "duck", "duck", 90053 ]), 
            [ "duck" ]
        )).toEqual( new Set([ 90053 ]) );
    })

    it('6 {NOT} check behaviour with String(numbers) and Number(strings)', function () {
        expect(filter(
            new Set([ "the", "619", "FAT", "dog", 15, 9  ]), 
            [ "fat", "15", 619 ]
        )).not.toEqual( new Set([ "the", "FAT", "dog", 9 ]) );
    })

})

