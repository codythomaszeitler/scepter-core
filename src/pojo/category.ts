import {Transaction} from '../pojo/transaction';

export const CATEGORY_TYPE = 'Category';

export class Category {

    name : string;
    transactions : Transaction[];

    constructor(name : string) {
        if (!name) {
            throw new Error('Cannot build a category with a falsy type string');
        }

        if (name.trim().length === 0) {
            throw new Error('Must give a value that is not just empty space');
        }

        this.name = name.trim();
        this.transactions = [];
    }

    getName() {
        return this.name;
    }

    setName(newName : string) {
        if (!newName) {
            throw new Error('Cannot build a category with a falsy type string');
        }

        if (newName.trim().length === 0) {
            throw new Error('Must give a value that is not just empty space');
        }

        this.name = newName;
    }

    associate(transaction : Transaction) {
        this.transactions.push(transaction.copy());
    }

    unassociate(transaction : Transaction) {
        this.transactions = this.transactions.filter(function (inner) {
            return !transaction.equals(inner);
        });
    }

    getTransactions() {
        const copied = [];
        for (let i = 0; i < this.transactions.length; i++) {
            copied.push(this.transactions[i].copy());
        }
        return copied;
    }

    equals(category : Category) {
        return this.name === category.name;
    }

    copy() {
        const category = new Category(this.name);
        for (let i = 0; i < this.transactions.length; i++) {
            category.associate(this.transactions[i]);
        }

        return category;
    }

    getHeaderNames() {
        const headerNames = new Set<string>();
        for (const transaction of this.transactions) {
            for (const headerName of transaction.getHeaderNames()) {
                headerNames.add(headerName);
            }
        }
        return Array.from(headerNames.values());
    }
}

export class CategoryColumnIdentifier {

    public category : Category;
    public columnName : string;

    public constructor(category : Category, columnName : string) {
        this.category = category.copy();
        this.columnName = columnName;
    }

    public equals(categoryColumnIdentifier : CategoryColumnIdentifier) {
        return this.category.equals(categoryColumnIdentifier.category) &&
            this.columnName === categoryColumnIdentifier.columnName;
    }
}

export class HeaderIdentifier {

    public headerName : string;

    public constructor(headerName : string) {
        this.headerName = headerName;
    }

    public equals(headerIdentifier : HeaderIdentifier) {
        return this.headerName === headerIdentifier.headerName;
    }

}