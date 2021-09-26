import { FunctionValue } from "./function.value";
import { NodeUser } from "./node.user";

export class FunctionConstant implements FunctionValue {

    value : number;

    constructor(value : number) {
        this.value = value;
    }

    get (context : NodeUser) {
        return this.value;
    }
}