"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../src/extensions/string-extensions");
test("remove non-numeric", function () {
    expect("ab2303bo(&3".removeNonNumeric()).toBe("23033");
});
describe("hex to rgb", function () {
    test("already expanded", function () {
        expect("#0453ff".toRGB()).toBe("rgb(4, 83, 255)");
        expect("#000000".toRGB()).toBe("rgb(0, 0, 0)");
    });
    test("triplet", function () {
        expect("#eee".toRGB()).toBe("rgb(238, 238, 238)");
    });
    test("triplet with capitals", function () {
        expect("#9ED".toRGB()).toBe("rgb(153, 238, 221)");
    });
    test("should throw an error if invalid parameters", function () {
        expect(function () { "something".toRGB(); }).toThrow();
    });
});
describe("rgb to hex", function () {
    test("with spaces", function () {
        expect("rgb(4, 83, 255)".toHex()).toBe("#0453ff");
        expect("rgb(0, 0, 0)".toHex()).toBe("#000000");
    });
    test("no spaces", function () {
        expect("rgb(238,238,238)".toHex()).toBe("#eeeeee");
    });
});
