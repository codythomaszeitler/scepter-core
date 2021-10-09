import { Category, CategoryColumnIdentifier, HeaderIdentifier } from './category';
import { Function } from './function';
import { Expression, isExpression } from './expression';
import { FunctionOperator } from "./function.operator";
import { NodeUser } from "./node.user";
import { ExpressionParser } from "./function.parser";
import { FunctionCategoryColumn } from './function.category.column';
import { FunctionNodeName } from './function.node.name';
import { FunctionHeaderColumn } from './function.header.column';
import { isJsxFragment } from 'typescript';
import { e } from 'mathjs';

export class Node {

    private name: string;
    private linkedCategories: Array<Category>;
    private linkedNodes: Array<Node>;
    private onFunctionAddedListeners: Array<FunctionAddedListener>;

    private onFunctionChangedListeners: Map<string, Array<FunctionChangedListener>>;

    private functions: Map<string, Function>;

    constructor(name: string) {
        this.name = name;
        this.linkedCategories = new Array<Category>();
        this.linkedNodes = new Array<Node>();
        this.functions = new Map<string, Function>();
        this.onFunctionAddedListeners = new Array<FunctionAddedListener>();
        this.onFunctionChangedListeners = new Map<string, Array<FunctionChangedListener>>();
    }

    public getFunction(functionName: string) {
        if (!this.functions.has(functionName)) {
            const errorMessage = `Could not find function [${functionName}] on node [${this.name}]`
            throw new Error(errorMessage);
        }

        return this.functions.get(functionName);
    }

    public getFunctions() {
        return new Map(this.functions);
    }

    public initFunction(functionName: string, expression: NodeExpression) {
        const nodeFunction = new Function(this.getExpressionFrom(expression));
        this.functions.set(functionName, nodeFunction);

        for (let listener of this.onFunctionAddedListeners) {
            const event = new OnFunctionAddedEvent(this, functionName, nodeFunction);
            listener.onFunctionAdded(event);
        }
    }

    public addExpressionTo(functionName: string, expression: NodeExpression, operator: FunctionOperator) {
        const nodeFunction = this.functions.get(functionName);
        if (nodeFunction) {
            const realizedExpression = this.getExpressionFrom(expression);
            nodeFunction.addExpression(realizedExpression, operator);
            this.notifyFunctionChangedListeners(functionName, realizedExpression, operator);
        }
    }

    private notifyFunctionChangedListeners(functionName : string, expression : Expression, operator : FunctionOperator) {
        const listeners = this.onFunctionChangedListeners.get(functionName);
        if (listeners) {
            for (let listener of listeners) {
                const event = new OnFunctionChangedEvent(this, functionName, expression, operator);
                listener.onFunctionChanged(event);
            }
        }
    }

    // @ts-ignore
    private getExpressionFrom(expression: Expression | NodeFunctionIdentifier | string | CategoryColumnIdentifier | HeaderIdentifier) {
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


    public runFunction(functionName: string, nodeUser: NodeUser) {
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

    public link(linked: Category | Node) {
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

    public addOnFunctionChangedListener(functionName : string, listener : FunctionChangedListener) {
        if (!this.onFunctionChangedListeners.has(functionName)) {
            this.onFunctionChangedListeners.set(functionName, new Array<FunctionChangedListener>());
        }
        this.onFunctionChangedListeners.get(functionName)!.push(listener);
    }

    public removeOnFunctionChangedListener(functionName : string, listener : FunctionChangedListener) {
        if (this.onFunctionChangedListeners.has(functionName)) {
            let listeners = this.onFunctionChangedListeners.get(functionName);

            listeners = listeners?.filter((inner) => {
                return listener !== inner;
            });

            if (listeners) {
                this.onFunctionChangedListeners.set(functionName, listeners);
            }
        }
    }
}

type NodeExpression = Expression |
    NodeFunctionIdentifier | 
    string | 
    CategoryColumnIdentifier | 
    HeaderIdentifier;

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

    public node: Node;
    public functionName: string;

    public constructor(node: Node, functionName: string) {
        this.node = node;
        this.functionName = functionName;
    }

    public equals(toCompare: NodeFunctionIdentifier) {
        return this.node.equals(toCompare.node) &&
            this.functionName === toCompare.functionName;
    }
}

export interface FunctionChangedListener {
    onFunctionChanged: (event: OnFunctionChangedEvent) => void;
}

export class OnFunctionChangedEvent {
    
    public node : Node;
    public functionName : string;
    public expression : Expression;
    public operator : FunctionOperator;

    constructor(node: Node, functionName: string, expression: Expression, operator : FunctionOperator) {
        this.node = node;
        this.functionName = functionName;
        this.expression = expression;
        this.operator = operator;
    }
}