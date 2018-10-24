import "../../src/extensions/string-extensions";

test("remove non-numeric", () => {
    expect("ab2303bo(&3".removeNonNumeric()).toBe("23033");
});

describe("hex to rgb", () => {
    test("already expanded", () => {
        expect("#0453ff".toRGB()).toBe("rgb(4, 83, 255)");
        expect("#000000".toRGB()).toBe("rgb(0, 0, 0)");
    });
    test("triplet", () => {
        expect("#eee".toRGB()).toBe("rgb(238, 238, 238)");
    });
    test("triplet with capitals", () => {
        expect("#9ED".toRGB()).toBe("rgb(153, 238, 221)");
    });
    test("should throw an error if invalid parameters", () => {
        expect(() => { "something".toRGB(); }).toThrow();
    });
});

describe("rgb to hex", () => {
    test("with spaces", () => {
        expect("rgb(4, 83, 255)".toHex()).toBe("#0453ff");
        expect("rgb(0, 0, 0)".toHex()).toBe("#000000");
    });
    test("no spaces", () => {
        expect("rgb(238,238,238)".toHex()).toBe("#eeeeee");
    });
});
