declare global {
    interface CSSStyleDeclaration {
        widthInPixels(): number;
        heightInPixels(): number;
    }
}

CSSStyleDeclaration.prototype.widthInPixels = function() {
    if (this.width) {
        return Number.parseInt(this.width.replace("px", ""), 10);
    }
    throw new Error("width is null");
};

CSSStyleDeclaration.prototype.heightInPixels = function() {
    if (this.height) {
        return Number.parseInt(this.height.replace("px", ""), 10);
    }
    throw new Error("height is null");
};

export { };
