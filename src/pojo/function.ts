import { FunctionOperator } from './function.operator';
import { Expression } from './expression';
import { NodeUser } from './node.user';
import { evaluate } from './math';

export class Function implements Expression {

    private initialValue : Expression;
    private values: Array<ExpressionWithOperator>;

    constructor(expression : Expression) {
        this.initialValue = expression;
        this.values = new Array<ExpressionWithOperator>();
    }

    public addExpression(expression : Expression, operator : FunctionOperator) {
        this.values.push(
            new ExpressionWithOperator(operator, expression)
        );
    }

    public requirements() {
        // return this.leftValue.requirements().append(this.rightValue.requirements());
        return this.initialValue.requirements();
    }

    public get(nodeUser: NodeUser) {

        let fullExpression = this.initialValue.get(nodeUser).toString();
        for (let expressionWithOperator of this.values) {

            const expression = expressionWithOperator.expression.get(nodeUser).toString();
            const operator = expressionWithOperator.operator.view();

            fullExpression = fullExpression + operator + expression;
        }

        return evaluate(fullExpression);
    }

    public view() {
        // return this.leftValue.view() +
        //     this.operator.view() +
        //     this.rightValue.view();
        return '';
    }

    public composition() {
        const compositions = new Array<FunctionPart>();
        compositions.push(this.initialValue);
        for (let expressionWithOperator of this.values) {
            compositions.push(expressionWithOperator.operator);
            compositions.push(expressionWithOperator.expression);
        }
        return compositions;
    }
}

export type FunctionPart = Expression | FunctionOperator;


class ExpressionWithOperator {

    public expression : Expression;
    public operator : FunctionOperator;

    public constructor(operator : FunctionOperator, expression : Expression) {
        this.expression = expression;
        this.operator = operator;
    }
}