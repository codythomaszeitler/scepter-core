import { Category, CategoryColumnIdentifier, HeaderIdentifier } from './category';
import { FunctionConstant } from './function.constant';
import { Node, NodeFunctionIdentifier } from './node';

export class ExpressionParser {
    public parse(expression: string) {

        if (expression.startsWith('{')) {
            expression = expression.replace(/{|}/g, '');

            const splits = expression.split('.');

            if (splits.length > 2 || splits.length === 1) {
                const numPeriodsInString = splits.length - 1;
                const errorMessage = `The number of periods of node-function-id was incorrect [${numPeriodsInString}], should have been [1]`;
                throw new Error(errorMessage);
            }

            const node = new Node(splits[0]);
            const functionName = splits[1];

            return new NodeFunctionIdentifier(
                node, 
                functionName
            );
        } else if (expression.startsWith('(')) {
            expression = expression.replace(/\(|\)/g, '');

            const splits = expression.split('.');

            if (splits.length === 1) {
                const headerName = splits[0];
                return new HeaderIdentifier(headerName);
            } else if (splits.length == 2) {
                const category = new Category(splits[0]);
                const functionName = splits[1];
    
                return new CategoryColumnIdentifier(
                    category, functionName
                )
            } else {
                const numPeriodsInString = splits.length - 1;

                const errorMessage = `The number of periods of column-header-id was incorrect [${numPeriodsInString}], should have been [1 || 0]`;
                throw new Error(errorMessage);
            }
        } else {
            const asNumber = new Number(expression);

            if (isNaN(asNumber.valueOf())) {
                const errorMessage = `The string [${expression}] could not be parsed`; 
                throw new Error(errorMessage);
            }

            const constant = new FunctionConstant(asNumber.valueOf());
            return constant;
        }
    }
}