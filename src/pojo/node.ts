import { Category } from "./category";
import { Function } from './function';

export class Node {

    private name: string;
    private linked: Array<Category>;
    private currentFunctionId: number;
    private functions: Map<string, Function>;
    private onFunctionAddedListeners: Array<FunctionAddedListener>;

    constructor(name: string) {
        this.name = name;
        this.linked = new Array<Category>();
        this.functions = new Map<string, Function>();
        this.currentFunctionId = 0;
        this.onFunctionAddedListeners = new Array<FunctionAddedListener>();
    }

    public equals(node: Node) {
        return node.name === this.name;
    }

    public link(category: Category) {
        this.linked.push(category.copy());
    }

    private containsLinkedCategory(toCheck: Category) {
        let contains = false;

        for (let category of this.linked) {
            if (toCheck.equals(category)) {
                contains = true;
                break;
            }
        }

        return contains;
    }

    public add(nodeFunction: Function) {

        const requirements = nodeFunction.requirements();

        const requiredCategories = requirements.getCategoryRequirements();
        for (let requiredCategory of requiredCategories) {
            if (!this.containsLinkedCategory(requiredCategory.getCategory())) {
                throw new Error('Function needs category [' +
                    requiredCategory.getCategory().getName() + '] but node user did not have it');
            }
        }

        // So what COULD be the requirements at this point?
        // Each function will could need these things:

        // 1) They could need a category.
        // 2) They could need a header WITHIN that category. 
        // 3) The could need a node and its associated function.

        const functionName = this.currentFunctionId + '';
        this.functions.set(functionName, nodeFunction);

        for (let listener of this.onFunctionAddedListeners) {
            const event = new OnFunctionAddedEvent(
                this, functionName, nodeFunction
            );
            listener.onFunctionAdded(event);
        }

        return functionName;
    }

    public getFunction(functionName: string) {
        const found = this.getFunctionToRun(functionName);
        if (!found) {
            throw new Error('Function with name [' + functionName + '] was not found.');
        }
        return found;
    }

    private getFunctionToRun(functionName: string) {
        const found = this.functions.get(functionName);
        return found;
    }

    public getName() {
        return this.name;
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