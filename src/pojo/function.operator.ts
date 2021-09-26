export class FunctionOperator {

    public static DIVISION = new FunctionOperator('/');

    operator : string;

    private constructor(operator: string) {
        this.operator = operator;
    }
}
