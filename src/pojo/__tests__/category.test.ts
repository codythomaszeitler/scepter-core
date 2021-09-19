import { Category } from "../category";
import { Currency } from "../currency";
import {Transaction } from '../transaction';
import { TransactionDetail } from "../transaction.detail";

describe('Category', () => {
    it('should respect equality', () => {
        const a = new Category('A');

        expect(a.equals(a.copy())).toBe(true);

        const b = new Category('B');
        expect(a.equals(b)).toBe(false);
    });

    it('should be able to associate a transaction' , () => {
        const testObject = new Category('Test');
        // @ts-ignore
        testObject.associate(new Transaction([TransactionDetail.withCurrency(new Currency(500))]));

        const transactions = testObject.getTransactions();
        expect(transactions.length).toBe(1);
    });

    it('should be able to unassociate a transaction', () => {
        const testObject = new Category('Test');
        // @ts-ignore
        testObject.associate(new Transaction([TransactionDetail.withCurrency(new Currency(500))]));
        // @ts-ignore
        testObject.unassociate(new Transaction([TransactionDetail.withCurrency(new Currency(500))]));

        const transactions = testObject.getTransactions();
        expect(transactions.length).toBe(0);
    });

    it('should return an empty list if there are no associated transactions', () => {
        const testObject = new Category('Test');
        expect(testObject.getTransactions().length).toBe(0);
    });

    it('should throw an exception if an empty category type is given', () => {

        let caughtException = new Error();;
        try {
            new Category('    '); 
        } catch (e ) {
            // @ts-ignore
            caughtException = e;
        }
        expect(caughtException.message).toBe('Must give a value that is not just empty space');
    });

    it('should trim off empty white space around the given type', () => {
        const testObject = new Category('     a    ');
        expect(testObject.getName()).toBe('a');
    });

    it('should throw an exception if a falsy type is given', () => {
        let caughtException = new Error();
        try {
            // @ts-ignore
            new Category(null);
        } catch (e) {
            // @ts-ignore
            caughtException = e;
        }

        expect(caughtException.message).toBe('Cannot build a category with a falsy type string');
    });

    it('should allow you to get column header names', () => {

        const testObject = new Category('A');

        testObject.associate(new Transaction( ));

    });
});