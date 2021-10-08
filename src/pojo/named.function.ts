import { Expression } from "./expression";
import { NodeUser } from "./node.user";
import { Function } from './function';

export class NamedFunction implements Expression {

    private name: string;
    private nodeFunction: Function;

    constructor(name: string, nodeFunction: Function) {
        this.name = name;
        this.nodeFunction = nodeFunction;
    }

    public get(nodeUser: NodeUser) {
        return this.nodeFunction.get(nodeUser);
    }

    public requirements() {
        return this.nodeFunction.requirements();
    }

    public view() {
        return this.nodeFunction.view();
    }

    public getName() {
        return this.name;
    }

    public getFunction() {
        return this.nodeFunction;
    }
}