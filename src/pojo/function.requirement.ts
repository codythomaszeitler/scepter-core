import { Node } from './node';

export class FunctionRequirement {

    private node: Node;
    private functionName : string;

    constructor(node : Node, functionName : string) {
        this.node = node;
        this.functionName = functionName;
    }

    public getNode() {
        return this.node;
    }

    public getFunctionName() {
        return this.functionName;
    }
}