import { Function } from "./function";
import { FunctionConstant } from "./function.constant";
import { FunctionOperator } from "./function.operator";

export class ImpotentFunction extends Function {
    constructor() {
        super(new FunctionConstant(0), FunctionOperator.ADDITION, new FunctionConstant(0));
    }
}
