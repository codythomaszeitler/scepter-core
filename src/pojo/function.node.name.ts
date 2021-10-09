import { Expression } from './expression';
import { NodeRequirement } from './node.requirement';
import { NodeUser } from './node.user';
import { Node } from './node';

export class FunctionNodeName implements Expression {

    private node: Node;
    private functionName: string;

    constructor(node: Node, functionName: string) {
        this.node = node;
        this.functionName = functionName;
    }

    public get(nodeUser: NodeUser) {
        return nodeUser.run(this.node, this.functionName);
    }

    public requirements() {
        return new NodeRequirement([], [], []);
    }

    public view() {
        return '{' + this.node.getName() + '.' + this.functionName + '}';
    }
}