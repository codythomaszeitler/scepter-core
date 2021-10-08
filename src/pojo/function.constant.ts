import { Expression } from "./expression";
import { NodeRequirement } from "./node.requirement";
import { NodeUser } from "./node.user";

export class FunctionConstant implements Expression {

    value: number;

    constructor(value: number) {
        this.value = value;
    }

    public requirements() {
        return new NodeRequirement([], [], []);
    }

    public get(context: NodeUser) {
        return this.value;
    }

    public view() {
        return this.value + '';
    }
}