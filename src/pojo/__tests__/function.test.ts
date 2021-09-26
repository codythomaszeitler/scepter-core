import { Category } from '../category';
import { AMOUNT_TYPE, Transaction } from '../transaction';
import { TransactionDetail } from '../transaction.detail';
import { NodeUser } from '../node.user';
import { FunctionCategoryColumn } from '../function.category.column';
import { FunctionOperator } from '../function.operator';
import { FunctionConstant } from '../function.constant';
import { Function } from '../function';
import { Node } from '../node';

describe('function', () => {

    it('should be able to construct a function from a category', () => {
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

        const functionName = nodeUser.addFunction(node, new Function(
            new FunctionCategoryColumn(category, 'TEST-NUMBER-COLUMN'),
            FunctionOperator.DIVISION,
            new FunctionConstant(8)
        ));

        const result = nodeUser.run(node, functionName);

        expect(result).toBe(4);
    });

    it ('should throw an exception if the function requires something the node is not linked to', () => {
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

        let caughtException = new Error('');
        try {
            nodeUser.addFunction(node, new Function(
                new FunctionCategoryColumn(category, 'TEST-NUMBER-COLUMN'),
                FunctionOperator.DIVISION,
                new FunctionConstant(8)
            ));
        } catch (e) {
            caughtException = (e as Error);
        }

        expect(caughtException.message).toBe('Function needs category [Test] but node user did not have it');
    });

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