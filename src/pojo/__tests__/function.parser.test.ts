import { Node, NodeFunctionIdentifier } from '../node';
import { ExpressionParser } from '../function.parser';
import { Category, CategoryColumnIdentifier, HeaderIdentifier } from '../category';
import { FunctionConstant } from '../function.constant';
import { NodeUser } from '../node.user';

describe('Function Element Parser', () => {

    it('should able to parse a node and a function name from a string', () => {
        const elementParserString = '{Test Node.Test Function Name}';

        const testObject = new ExpressionParser();
        const functionId = testObject.parse(elementParserString);

        const expected = new NodeFunctionIdentifier(
            new Node('Test Node'),
            'Test Function Name'
        );

        if (functionId instanceof NodeFunctionIdentifier) {
            expect(expected.equals(functionId)).toBeTruthy();
        } else {
            expect(false).toBeTruthy();
        }
    });

    it('should be able to parse a category and a column name from a string', () => {
        const elementParserString = '(Test Category.Test Column Name)';

        const testObject = new ExpressionParser();
        const categoryColumnId = testObject.parse(elementParserString);

        const expected = new CategoryColumnIdentifier(
            new Category('Test Category'),
            'Test Column Name'
        );

        if (categoryColumnId instanceof CategoryColumnIdentifier) {
            expect(categoryColumnId.equals(expected)).toBeTruthy();
        } else {
            expect(false).toBeTruthy();
        }
    });

    it('should be able to parse a number from a string', () => {
        const elementParserString = '8';

        const testObject = new ExpressionParser();
        const number = testObject.parse(elementParserString);

        const expected = new FunctionConstant(8);

        if (number instanceof FunctionConstant) {
            const nodeUser = new NodeUser();
            expect(number.get(nodeUser)).toBe(8);
        } else {
            expect(false).toBeTruthy();
        }
    });

    it('should be able to parse just a header name from a string', () => {
        const elementParserString = '(Amount)';

        const testObject = new ExpressionParser();
        const header = testObject.parse(elementParserString);

        const expected = new HeaderIdentifier('Amount');

        if (header instanceof HeaderIdentifier) {
            expect(header.equals(expected)).toBeTruthy();
        } else {
            expect(false).toBeTruthy();
        }
    });

    it('should throw an exception if there are two periods within a node function id', () => {

        const elementParserString = '{Test Node.Test Function Name.I should not be here}';

        const testObject = new ExpressionParser();

        let caughtException = new Error();
        try {
            testObject.parse(elementParserString);
        } catch (e) {
            caughtException = (e as Error);
        }

        expect(caughtException.message).toBe('The number of periods of node-function-id was incorrect [2], should have been [1]');
    });

    it('should throw an exception if there are not enough periods within the node function id', () => {
        const elementParserString = '{Test Node}';

        const testObject = new ExpressionParser();

        let caughtException = new Error();
        try {
            testObject.parse(elementParserString);
        } catch (e) {
            caughtException = (e as Error);
        }

        expect(caughtException.message).toBe('The number of periods of node-function-id was incorrect [0], should have been [1]');
    });

    it('should throw an exception if there are too many periods within the category-header-id', () => {
        const elementParserString = '(A.B.C)';

        const testObject = new ExpressionParser();

        let caughtException = new Error();
        try {
            testObject.parse(elementParserString);
        } catch (e) {
            caughtException = (e as Error);
        }
        expect(caughtException.message).toBe('The number of periods of column-header-id was incorrect [2], should have been [1 || 0]');
    });

    it('should throw an exception if the given string is not a number if no ( or { given', () => {

        const elementParserString = 'NOT A NUMBER';

        const testObject = new ExpressionParser();

        let caughtException = new Error();
        try {
            testObject.parse(elementParserString);
        } catch (e) {
            caughtException = (e as Error);
        }
        expect(caughtException.message).toBe('The string [NOT A NUMBER] could not be parsed');
    });
});