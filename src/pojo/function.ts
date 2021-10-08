import { FunctionOperator } from './function.operator';
import { Expression } from './expression';
import { NodeUser } from './node.user';

export class Function implements Expression {

    private leftValue: Expression;
    private operator: FunctionOperator;
    private rightValue: Expression;

    constructor(leftValue: Expression, operator: FunctionOperator, rightValue: Expression) {
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