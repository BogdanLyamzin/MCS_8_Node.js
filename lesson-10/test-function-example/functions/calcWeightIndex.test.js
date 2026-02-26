import calcWeightIndex from "./calcWeightIndex.js";

/*
1. Given weight in kg and height in metr.
2. Return weight / (height * height) round 2.
3. Throw error with correct message if given invalid data

90, 1.9 => 24.93
1.9, 90 => error 'weight must be first argument and height - second'
 => error 'weight and height required'
'90', '1.9' => error 'weight and height must be number'
*/

describe("test calcWeightIndex function", ()=> {
    test("90, 1.9 => 24.93", ()=> {
        const result = calcWeightIndex(90, 1.9);
        expect(result).toBe(24.93);
        /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    if(value === result) {
                        show Jest test passed
                    }
                    else {
                        show Jest test failed
                    }
                }
            }
        }
        */
    })

    test("1.9, 90 => error 'weight must be first argument and height - second'", ()=> {
        expect(()=> calcWeightIndex(1.9, 90)).toThrow('weight must be first argument and height - second');
    })

    it(" => error 'weight and height required'", ()=> {
        expect(()=> calcWeightIndex()).toThrow('weight and height required');
    })

    test("'90', '1.9' => error 'weight and height must be number'", ()=> {
        expect(()=> calcWeightIndex('90', '1.9')).toThrow('weight and height must be number')
    })
})