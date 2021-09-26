import { FunctionOperator } from './function.operator';
import { FunctionValue } from './function.value';
import { NodeUser } from './node.user';

export class Function implements FunctionValue {

    private leftValue: FunctionValue;
    private operator: FunctionOperator;
    private rightValue: FunctionValue;

    constructor(leftValue: FunctionValue, operator: FunctionOperator, rightValue: FunctionValue) {
        this.leftValue = leftValue;
        this.operator = operator;
        this.rightValue = rightValue;
    }

    public requirements() {
        return this.leftValue.requirements().append(this.rightValue.requirements());
    }

    public get(nodeUser: NodeUser) {
        const parsedLeftValue = this.leftValue.get(nodeUser);
        const parsedRightValue = this.rightValue.get(nodeUser);

        if (FunctionOperator.DIVISION.equals(this.operator)) {
            return parsedLeftValue / parsedRightValue;
        } else if (FunctionOperator.ADDITION.equals(this.operator)) {
            return parsedLeftValue + parsedRightValue;
        } else if (FunctionOperator.MULTIPLICATION.equals(this.operator)) {
            return parsedLeftValue * parsedRightValue;
        } else if (FunctionOperator.SUBTRACTION.equals(this.operator)) {
            return parsedLeftValue - parsedRightValue;
        } else {
            throw new Error('Unsupported');
        }
    }

    public view() {
        return this.leftValue.view() +
            this.operator.view() +
            this.rightValue.view();
    }
}