// todo: ここに単体テストを書いてみましょう！
const fn = require('../functions.ts');

describe("sumOfArray test", () => {
    test('Check normal', () => {
        expect(fn.sumOfArray([1,2])).toBe(3);
        expect(fn.sumOfArray([1])).toBe(1);
        expect(fn.sumOfArray([])).toBe(0);
    });
});

describe("asyncSumOfArray test", () => {
    test('Check normal', () => {
        expect(fn.asyncSumOfArray([1,2])).resolves.toBe(3);
        expect(fn.asyncSumOfArray([1])).resolves.toBe(1);
        expect(fn.asyncSumOfArray([])).resolves.toBe(0);
    });
    // 空の配列を渡した場合は初期値0を設定するため、例外が発生しないので以下のテストをskipする
    // test('Check non-normal', () => {
    //     expect(fn.asyncSumOfArray([])).rejects.toThrow();
    // });
});

describe('asyncSumOfArraySometimesZero test', () => {
    test('Check normal', () => {
        const dbMock = jest
        .fn()
        .mockImplementationOnce(() => {
            return {
                save: () :void => {}
            };
        })
        .mockImplementationOnce(() => {
            return {
                save: () :void => {
                    throw new Error("fail");
                }
            };
        });

        expect(fn.asyncSumOfArraySometimesZero([0,1], dbMock())).resolves.toBe(1);
        expect(fn.asyncSumOfArraySometimesZero([0,1], dbMock())).resolves.toBe(0);
    });
});

describe('getFirstNameThrowIfLong test', () => {
    const NameApiMock = jest
    // mockのデフォルトとして以下のmockを設定することで何度呼ばれてもデフォルト値が返る
    .fn(() => {
        return {
            getFirstName () :Promise<string>{
                return new Promise((resolve) => {
                        resolve("ABCD");
                    });
            }
        };
    });
    test('Check normal', () => {
        expect(fn.getFirstNameThrowIfLong(5, NameApiMock())).resolves.toEqual("ABCD");
    });
    test('Check non-normal', () => {
        expect(fn.getFirstNameThrowIfLong(3, NameApiMock())).rejects.toStrictEqual(new Error("first_name too long"));
    });
})

describe('load config test', () => {
    
})