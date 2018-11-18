// NOTE: all CSS properties and possible values are taken from W3Schools.
// Available at the following link: https://www.w3schools.com/cssref

export class CSSStyle {

    public name: string;
    public valueType: VALUE_TYPE;
    public values: string[];

    constructor(name: string, valueType: VALUE_TYPE, values: string[]) {
        this.name = name;
        this.valueType = valueType;
        this.values = values;

    }
}

export enum VALUE_TYPE {
    COLOR, DEFINED,
}

export const cssProperties =
    [
        new CSSStyle("color", VALUE_TYPE.COLOR, []),
        new CSSStyle("background-color", VALUE_TYPE.COLOR, []),
        new CSSStyle("display", VALUE_TYPE.DEFINED,
            ["inline", "block", "contents", "flex", "grid", "inline-block",
             "inline-flex", "inline-grid", "inline-table", "list-item",
             "run-in", "table", "table-caption", "table-column-group",
            "table-header-group", "table-footer-group", "table-row-group",
            "table-cell", "table-column", "table-row", "none", "initial", "inherit"]),
    ];
