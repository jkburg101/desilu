"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.removeNonNumeric = function () {
    return this.replace(/\D/g, "");
};
String.prototype.toHex = function () {
    var _a = this.split(",").map(function (it) { return it.trim().removeNonNumeric(); }), r = _a[0], g = _a[1], b = _a[2];
    return "#" + numberToHex(Number(r)) + numberToHex(Number(g)) + numberToHex(Number(b));
};
String.prototype.toRGB = function () {
    if (this[0] === "#" && (this.length === 4 || this.length === 7)) {
        var hexAsNumber = parseInt(expandedHex(this.toString()).replace("#", ""), 16);
        var r = (hexAsNumber >> 16) & 255;
        var g = (hexAsNumber >> 8) & 255;
        var b = hexAsNumber & 255;
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
    else {
        throw new Error("String must be in hex format, such as '#xxx' or '#xxxxxx'");
    }
};
function expandedHex(str) {
    if (str.length === 4) {
        str = str.split("").map(function (it) {
            if (it !== "#") {
                return it + it;
            }
            return it;
        }).join("");
    }
    return str;
}
function numberToHex(num) {
    var hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
