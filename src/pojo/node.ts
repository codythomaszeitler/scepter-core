import { Category, CategoryColumnIdentifier, HeaderIdentifier } from './category';
import { Function } from './function';
import { Expression, isExpression } from './expression';
import { FunctionOperator } from "./function.operator";
import { NodeUser } from "./node.user";
import { ExpressionParser } from "./function.parser";
import { FunctionCategoryColumn } from './function.category.column';
import { FunctionNodeName } from './function.node.name';
import { FunctionHeaderColumn } from './function.header.column';

export class Node {

    private name: string;
    private linkedCategories: Array<Category>;
    private linkedNodes : Array<Node>;
    private onFunctionAddedListeners: Array<FunctionAddedListener>;

    private functions : Map<string, Function>;

    constructor(name: string) {
        this.name = name;
        this.linkedCategories = new Array<Category>();
        this.linkedNodes = new Array<Node>();
        this.functions = new Map<string, Function>();
        this.onFunctionAddedListeners = new Array<FunctionAddedListener>();
    }

    public getFunction(functionName : string) {
        if (!this.functions.has(functionName)) {
            throw new Error('Could not find function ' + functionName + ' from node ' + this.name);
        }

        return this.functions.get(functionName);
    }

    public initFunction(functionName: string, expression : Expression | NodeFunctionIdentifier | string | CategoryColumnIdentifier | HeaderIdentifier ) {
        const nodeFunction = new Function(this.getExpressionFrom(expression));
        this.functions.set(functionName, nodeFunction);
    }

    public addExpressionTo(functionName : string, expression : Expression | NodeFunctionIdentifier | string, operator : FunctionOperator) {
        const nodeFunction = this.functions.get(functionName);
        if (nodeFunction) {
            nodeFunction.addExpression(this.getExpressionFrom(expression), operator);
        }
    }

    // @ts-ignore
    private getExpressionFrom(expression : Expression | NodeFunctionIdentifier | string | CategoryColumnIdentifier | HeaderIdentifier) {
        if (isExpression(expression)) {
            return expression;
        }

        if (expression instanceof NodeFunctionIdentifier) {
            const nodeFunction = new FunctionNodeName(expression.node, expression.functionName);
            return nodeFunction;
        } else if (expression instanceof CategoryColumnIdentifier) {
            return new FunctionCategoryColumn(expression.category, expression.columnName);
        } else if (expression instanceof HeaderIdentifier) {
            const nodeFunction = new FunctionHeaderColumn(expression.headerName);
            return nodeFunction;
        } else {
            const parser = new ExpressionParser();
            // @ts-ignore
            const parsed = parser.parse(expression);
            return this.getExpressionFrom(parsed);
        }
    }

    public runFunction(functionName: string, nodeUser : NodeUser) {
        const nodeFunction = this.functions.get(functionName);
        return nodeFunction?.get(nodeUser);
    }

    public getLinkedCategories() {
        const linked = new Array<Category>();
        for (let category of this.linkedCategories) {
            linked.push(category.copy());
        }
        return linked;
    }

    public equals(node: Node) {
        return node.name === this.name;
    }

    public link(linked : Category | Node) {
        if (linked instanceof Category) {
            this.linkedCategories.push(linked.copy());
        } else {
            this.linkedNodes.push(linked);
        }
    }

    public getName() {
        return this.name;
    }

    public addOnFunctionAddedListener(listener: FunctionAddedListener) {
        this.onFunctionAddedListeners.push(listener);
    }

    public removeOnFunctionAddedListener(listener: FunctionAddedListener) {
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

export class NodeFunctionIdentifier {

    public node : Node;
    public functionName : string;

    public constructor(node : Node, functionName : string) {
        this.node = node;
        this.functionName = functionName;
    }

    public equals(toCompare : NodeFunctionIdentifier) {
        return this.node.equals(toCompare.node) &&
            this.functionName === toCompare.functionName;
    }
}