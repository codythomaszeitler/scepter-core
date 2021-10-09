import { Category } from '../category';
import { FunctionOperator } from '../function.operator';
import { Node } from '../node';
import { NodeUser } from '../node.user';
import { Transaction, AMOUNT_TYPE } from '../transaction';
import { TransactionDetail } from '../transaction.detail';

describe('Node', () => {

    it('should be able to take in an expression as string and add it to the correct area', () => {
        const nodeUser = new NodeUser();

        const testObject = new Node('Test Node');
        testObject.initFunction('Test Function Name', '8');

        expect(testObject.runFunction('Test Function Name', nodeUser)).toBe(8);
    });

    it('should be able to read a category-header-id from a string on init', () => {

        const nodeUser = new NodeUser();
        const testObject = new Node('Test Node');

        const category = new Category('Test Category');

        nodeUser.addCategory(category);

        const transaction = new Transaction([
            new TransactionDetail('16', 'A', AMOUNT_TYPE)
        ]);
        nodeUser.readyForCategorization(transaction);
        nodeUser.categorize(transaction, category);

        testObject.initFunction('Test Function Name', '(Test Category.A)');

        expect(testObject.runFunction('Test Function Name', nodeUser)).toBe(16);
    });

    it('should be able to read a node-function-id from a string on init', () => {
        const nodeUser = new NodeUser();
        const testObject = new Node('Test Node');

        nodeUser.addNode(testObject);

        testObject.initFunction('Constant Function', '16');
        testObject.initFunction('Test Function Name', '{Test Node.Constant Function}');

        expect(testObject.runFunction('Test Function Name', nodeUser)).toBe(16);
    });

    it('should be able to read a column-header only from a string on init', () => {
        const nodeUser = new NodeUser();
        const testObject = new Node('Test Node');

        const category = new Category('Test Category');
        nodeUser.addCategory(category);

        const anotherCategory = new Category('Another Test Category');
        nodeUser.addCategory(anotherCategory);

        const transaction = new Transaction([
            new TransactionDetail('16', 'A', AMOUNT_TYPE)
        ]);
        nodeUser.readyForCategorization(transaction);
        nodeUser.categorize(transaction, category);

        const anotherTransaction = new Transaction([
            new TransactionDetail('16', 'A', AMOUNT_TYPE)
        ]);
        nodeUser.readyForCategorization(anotherTransaction);
        nodeUser.categorize(anotherTransaction, category);

        testObject.initFunction('Test Function Name', '(A)');

        expect(testObject.runFunction('Test Function Name', nodeUser)).toBe(32);
    });

    it('should be able to add to a function with a node-function-id', () => {
        const nodeUser = new NodeUser();
        const testObject = new Node('Test Node');

        nodeUser.addNode(testObject);

        testObject.initFunction('Constant Function', '16');
        testObject.initFunction('Another Constant Function', '32');
        testObject.initFunction('Test Function Name', '10');

        testObject.addExpressionTo('Test Function Name', '{Test Node.Another Constant Function}', FunctionOperator.ADDITION);
        testObject.addExpressionTo('Test Function Name', '{Test Node.Constant Function}', FunctionOperator.ADDITION);

        expect(testObject.runFunction('Test Function Name', nodeUser)).toBe(58);
    });
});