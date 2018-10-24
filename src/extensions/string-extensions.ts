declare global {
    interface String {
        toHex(): string;
        toRGB(): string;
        removeNonNumeric(): string;
    }
}

String.prototype.removeNonNumeric = function() {
    return this.replace(/\D/g, "");
};

String.prototype.toHex = function() {
    const [r, g, b] = this.split(",").map((it) => it.trim().removeNonNumeric());
    return "#" + numberToHex(Number(r)) + numberToHex(Number(g)) + numberToHex(Number(b));
};

String.prototype.toRGB = function() {
    if (this[0] === "#" && (this.length === 4 || this.length === 7)) {

        const hexAsNumber = parseInt(expandedHex(this.toString()).replace("#", ""), 16);
        const r = (hexAsNumber >> 16) & 255;
        const g = (hexAsNumber >> 8) & 255;
        const b = hexAsNumber & 255;

        return `rgb(${r}, ${g}, ${b})`;
    } else {
        throw new Error("String must be in hex format, such as '#xxx' or '#xxxxxx'");
    }

};

function expandedHex(str: string): string {
    if (str.length === 4) {
        str = str.split("").map((it) => {
            if (it !== "#") {
                return it + it;
            }
            return it;
        }).join("");
    }
    return str;
}

function numberToHex(num: number) {
    const hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export {};
