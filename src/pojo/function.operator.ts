export class FunctionOperator {

    public static DIVISION = new FunctionOperator('/');
    public static MULTIPLICATION = new FunctionOperator('*');
    public static ADDITION = new FunctionOperator('+');
    public static SUBTRACTION = new FunctionOperator('-');

    operator : string;

    private constructor(operator: string) {
        this.operator = operator;
    }

    public equals(operator : FunctionOperator) {
        return this.operator === operator.operator;
    }

    public view() {
        return this.operator;
    }
}
