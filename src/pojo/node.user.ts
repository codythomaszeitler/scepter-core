import { SpectreUser } from "./spectre.user";
import { Node } from './node';
import { Category } from "./category";

export class NodeUser extends SpectreUser {

    private nodes: Array<Node>;

    private onNodeAddedListeners: Array<NodeAddedListener>;

    constructor() {
        super();
        this.nodes = new Array<Node>();
        this.onNodeAddedListeners = new Array<NodeAddedListener>();
    }

    public getNode(toFind: Node) {
        let found = new Node('NOT-FOUND');
        for (let node of this.nodes) {
            if (node.equals(toFind)) {
                found = node;
                break;
            }
        }
        return found;
    }

    public getNodes() {
        return this.nodes.slice();
    }

    public addNode(node: Node) {
        this.nodes.push(node);
        // So now we need to go through and alert all listeners.
        for (let listener of this.onNodeAddedListeners) {
            const event = new OnNodeAddedEvent(node);
            listener.onNodeAdded(event);
        }
    }

    public getLinkedCategories() {

    }

    public link(category: Category, node: Node) {
        const found = this.getNode(node);
        found.link(category);
    }


    public run(node: Node, functionName: string) {
        const foundNode = this.getNode(node);
        return foundNode.runFunction(functionName, this);
    }

    public addOnNodeAddedListener(listener: NodeAddedListener) {
        this.onNodeAddedListeners.push(listener);
    }

    public removeOnNodeAddedListener(listener: NodeAddedListener) {
        this.onNodeAddedListeners = this.onNodeAddedListeners.filter((value) => {
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

