import { Category } from '../category';
import { FunctionCategoryColumn } from '../function.category.column';
import { NodeUser } from '../node.user';
import { AMOUNT_TYPE, Transaction } from '../transaction';
import { TransactionDetail } from '../transaction.detail';

describe('Function Category Column', () => {

    it('should be able to sum all values in the column of the category', () => {

        const nodeUser = new NodeUser();
        const category = new Category('Test');
        const headerName = 'TEST-COLUMN-NAME';

        nodeUser.addCategory(category);
        
        const firstTransaction = new Transaction([
            new TransactionDetail('5', headerName, AMOUNT_TYPE)
        ]);
        nodeUser.readyForCategorization(firstTransaction);
        nodeUser.categorize(firstTransaction, category);

        const secondTransaction = new Transaction([
            new TransactionDetail('5', headerName, AMOUNT_TYPE)
        ]);

        nodeUser.readyForCategorization(secondTransaction);
        nodeUser.categorize(secondTransaction, category);

        const testObject = new FunctionCategoryColumn(
            category,
            headerName
        );

        expect(testObject.get(nodeUser)).toBe(10);
    });
});