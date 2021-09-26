import { FunctionOperator } from './function.operator';
import { FunctionValue } from './function.value';
import { NodeUser } from './node.user';

export class Function implements FunctionValue {

    leftValue : FunctionValue;
    operator : FunctionOperator;
    rightValue : FunctionValue;

    constructor(leftValue: FunctionValue, operator: FunctionOperator, rightValue: FunctionValue) {
        this.leftValue = leftValue;
        this.operator = operator;
        this.rightValue = rightValue;
    }

    get (nodeUser: NodeUser) {
        
    }
}