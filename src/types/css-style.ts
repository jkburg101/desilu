export class CSSStyle {

    public name: string;
    public values: string[];

    constructor(name: string, values: string[]) {
        this.name = name;
        this.values = values;

    }
}

export enum VALUE_TYPE {
    COLOR, DEFINED,
}

const cssProperties = {
    "background-attachment": "hello",
};
