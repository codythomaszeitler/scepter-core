import { Category } from '../category';
import { AMOUNT_TYPE, Transaction } from '../transaction';
import { TransactionDetail } from '../transaction.detail';
import { NodeUser } from '../node.user';
import { FunctionCategoryColumn } from '../function.category.column';
import { FunctionOperator } from '../function.operator';
import { FunctionConstant } from '../function.constant';
import { Function } from '../function';
import { Node, NodeFunctionIdentifier } from '../node';

describe('Function', () => {

    it('should be able to add an expression to a function', () => {

        const nodeUser = new NodeUser();

        const node = new Node('Test Node');
        nodeUser.addNode(node);

        const functionName = 'Test Function';
        node.initFunction(functionName, new FunctionConstant(8));

        const testObject = new Function(new FunctionConstant(8));
        testObject.addExpression(new FunctionConstant(8), FunctionOperator.ADDITION);

        expect(testObject.get(nodeUser)).toBe(16);
    });

    it('should be able to handle functions within functions', () => {

        const nodeUser = new NodeUser();

        const testObject = new Function(new FunctionConstant(8));

        const innerFunction = new Function(new FunctionConstant(16));
        innerFunction.addExpression(new FunctionConstant(16), FunctionOperator.ADDITION);

        testObject.addExpression(
            innerFunction, 
            FunctionOperator.ADDITION
        );

        expect(testObject.get(nodeUser)).toBe(40);
    });

    it('should be able to compose a function that rollups a column with other functions', () => {
        const nodeUser = new NodeUser();

        const category = new Category('Test');

        nodeUser.addCategory(category);

        const transaction = new Transaction([
            new TransactionDetail('16', 'TEST-NUMBER-COLUMN', AMOUNT_TYPE)
        ]);

        nodeUser.readyForCategorization(transaction);
        nodeUser.categorize(transaction, category);

        const anotherTransaction = new Transaction([
            new TransactionDetail('16', 'TEST-NUMBER-COLUMN', AMOUNT_TYPE)
        ]); 

        nodeUser.readyForCategorization(anotherTransaction);
        nodeUser.categorize(anotherTransaction, category);

        const node = new Node('Test Node Name');
        nodeUser.addNode(node);
        nodeUser.link(category, node);

        node.initFunction('Function Name', new FunctionCategoryColumn(
            category, 'TEST-NUMBER-COLUMN'
        ));

        node.addExpressionTo('Function Name', 
            new FunctionConstant(8), 
            FunctionOperator.DIVISION);

        expect(node.runFunction('Function Name', nodeUser)).toBe(4);
    });

    it('should be able to use two named functions from two different nodes', () => {
        const nodeUser = new NodeUser();

        const firstNode = new Node('Test First Node');
        const secondNode = new Node('Test Second Node');

        nodeUser.addNode(firstNode);
        nodeUser.addNode(secondNode);

        const firstCategory = new Category('Category A');
        const secondCategory = new Category('Category B');

        nodeUser.addCategory(firstCategory);
        nodeUser.addCategory(secondCategory);

        const transaction = new Transaction([
            new TransactionDetail('16', 'A', AMOUNT_TYPE)
        ]);

        nodeUser.readyForCategorization(transaction);
        nodeUser.categorize(transaction, firstCategory);

        const anotherTransaction = new Transaction([
            new TransactionDetail('8', 'B', AMOUNT_TYPE)
        ]); 

        nodeUser.readyForCategorization(anotherTransaction);
        nodeUser.categorize(anotherTransaction, secondCategory);

        firstNode.initFunction('First Function', new FunctionCategoryColumn(firstCategory, 'A'));
        secondNode.initFunction('Second Function', new FunctionCategoryColumn(secondCategory, 'B'));

        const thirdNode = new Node('Test Third Node');
        nodeUser.addNode(thirdNode);

        thirdNode.link(firstNode);
        thirdNode.link(secondNode);

        const firstId = new NodeFunctionIdentifier(firstNode, 'First Function');
        const secondId = new NodeFunctionIdentifier(secondNode, 'Second Function');

        thirdNode.initFunction('Third Function', firstId);
        thirdNode.addExpressionTo('Third Function', secondId, FunctionOperator.ADDITION);

        expect(thirdNode.runFunction('Third Function', nodeUser)).toBe(24);
    });

    // it ('should throw an exception if the function requires something the node is not linked to', () => {
    //     const nodeUser = new NodeUser();

    //     const category = new Category('Test');

    //     nodeUser.addCategory(category);

    //     const transaction = new Transaction([
    //         new TransactionDetail('16', 'TEST-NUMBER-COLUMN', AMOUNT_TYPE)
    //     ]);

    //     nodeUser.readyForCategorization(transaction);
    //     nodeUser.categorize(transaction, category);

    //     const anotherTransaction = new Transaction([
    //         new TransactionDetail('16', 'TEST-NUMBER-COLUMN', AMOUNT_TYPE)
    //     ]); 

    //     nodeUser.readyForCategorization(anotherTransaction);
    //     nodeUser.categorize(anotherTransaction, category);

    //     const node = new Node('Test Node Name');
    //     nodeUser.addNode(node);

    //     let caughtException = new Error('');
    //     try {
    //         nodeUser.addFunction(node, new Function(
    //             new FunctionCategoryColumn(category, 'TEST-NUMBER-COLUMN'),
    //             FunctionOperator.DIVISION,
    //             new FunctionConstant(8)
    //         ));
    //     } catch (e) {
    //         caughtException = (e as Error);
    //     }

    //     expect(caughtException.message).toBe('Function needs category [Test] but node user did not have it, had categories []');
    // });

    // it('should throw an exception if there is no header matching given name', () => {
    //     const nodeUser = new NodeUser();

    //     const category = new Category('Test');

    //     nodeUser.addCategory(category);

    //     const transaction = new Transaction([
    //         new TransactionDetail('16', 'TEST-NUMBER-COLUMN', AMOUNT_TYPE)
    //     ]);

    //     nodeUser.readyForCategorization(transaction);
    //     nodeUser.categorize(transaction, category);

    //     const anotherTransaction = new Transaction([
    //         new TransactionDetail('16', 'TEST-NUMBER-COLUMN', AMOUNT_TYPE)
    //     ]); 

    //     nodeUser.readyForCategorization(anotherTransaction);
    //     nodeUser.categorize(anotherTransaction, category);

    //     const node = new Node('Test Node Name');
    //     nodeUser.addNode(node);
    //     nodeUser.link(category, node);

    //     let caughtException = new Error('');
    //     try {
    //         nodeUser.addFunction(node, new Function(
    //             new FunctionCategoryColumn(category, 'NO-MATCH'),
    //             FunctionOperator.DIVISION,
    //             new FunctionConstant(8)
    //         ));
    //     } catch (e) {
    //         caughtException = (e as Error);
    //     }

    //     expect(caughtException.message).toBe('Function needs header name [NO-MATCH] but category [Test] did not have it');
    // });
});