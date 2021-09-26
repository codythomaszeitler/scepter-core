import { SpectreUser } from "./spectre.user";
import { Node } from './node';
import { Category } from "./category";
import { Function } from './function';

export class NodeUser extends SpectreUser {

    private nodes: Array<Node>;

    private onNodeAddedListeners: Array<NodeAddedListener>;
    private onFunctionAddedListeners: Array<FunctionAddedListener>;

    constructor() {
        super();
        this.nodes = new Array<Node>();
        this.onNodeAddedListeners = new Array<NodeAddedListener>();
        this.onFunctionAddedListeners = new Array<FunctionAddedListener>();
    }

    private getNode(toFind: Node) {
        let found = new Node('NOT-FOUND');
        for (let node of this.nodes) {
            if (node.equals(toFind)) {
                found = node;
                break;
            }
        }
        return found;
    }

    public addNode(node: Node) {
        this.nodes.push(node);
        // So now we need to go through and alert all listeners.
        for (let listener of this.onNodeAddedListeners) {
            const event = new OnNodeAddedEvent(node);
            listener.onNodeAdded(event);
        }
    }

    public link(category: Category, node: Node) {
        const found = this.getNode(node);
        found.link(category);
    }

    public addFunction(node: Node, nodeFunction: Function) {
        const found = this.getNode(node);
        const functionName = found.add(nodeFunction);

        for (let listener of this.onFunctionAddedListeners) {
            const event = new OnFunctionAddedEvent(
                node, functionName, nodeFunction
            );
            listener.onFunctionAdded(event);
        }

        return functionName;
    }

    public run(node: Node, functionName: string) {
        const foundNode = this.getNode(node);
        const foundFunction = foundNode.getFunction(functionName);

        return foundFunction.get(this);
    }

    public addOnNodeAddedListener(listener: NodeAddedListener) {
        this.onNodeAddedListeners.push(listener);
    }

    public removeOnNodeAddedListener(listener: NodeAddedListener) {
        this.onNodeAddedListeners = this.onNodeAddedListeners.filter((value) => {
            return value !== listener;
        });
    }

    public addOnFunctionAddedListener(listener: FunctionAddedListener) {
        this.onFunctionAddedListeners.push(listener);
    }

    public removeOnFunctionAddedListener(listener : FunctionAddedListener) {
        this.onFunctionAddedListeners = this.onFunctionAddedListeners.filter((value) => {
            return value !== listener;
        });
    }
}

export class OnNodeAddedEvent {

    public node: Node;

    constructor(node: Node) {
        this.node = node;
    }
}

export interface NodeAddedListener {
    onNodeAdded: (event: OnNodeAddedEvent) => void;
}

export class OnFunctionAddedEvent {

    public node: Node;
    public functionName: string;
    public nodeFunction: Function;

    constructor(node: Node, functionName: string, nodeFunction: Function) {
        this.node = node;
        this.functionName = functionName;
        this.nodeFunction = nodeFunction;
    }
}

export interface FunctionAddedListener {
    onFunctionAdded: (event: OnFunctionAddedEvent) => void;
}