import {
  SpectreUser,
  TransactionCategorizedListener,
  OnTransactionCategorizedEvent,
  OnCategoryRemovedEvent,
  TransactionUncategorizedListener,
  OnTransactionUncategorizedEvent,
  OnTransactionReadyForCategorizationEvent,
} from "../spectre.user";
import { Category } from "../category";
import { Currency } from "../currency";
import { STRING_TYPE, TransactionDetail } from "../transaction.detail";
import { Transaction, AMOUNT_TYPE } from "../transaction";
import { OnCategoryAddedEvent, CategoryAddedListener } from "../spectre.user";

describe("Spectre User", () => {
  it.skip("should allow a user to rollup a transaction", () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category("Home"));

    const details = [];
    //@ts-ignore
    details.push(new TransactionDetail("Chase cc0392", "Bank"));
    //@ts-ignore
    details.push(new TransactionDetail("JAPANESE STEAKHOUSE", "Business"));
    //@ts-ignore
    details.push(TransactionDetail.withCurrency(new Currency(400)));
    const transaction = new Transaction(details);

    testObject.readyForCategorization(transaction);
    expect(testObject.getUncategorized().length).toBe(1);

    testObject.categorize(transaction, new Category("Home"));
    expect(testObject.getUncategorized().length).toBe(0);

    const outputCurrency = testObject.rollup(new Category("Home"), AMOUNT_TYPE);
    expect(outputCurrency).toEqual(new Currency(400, "USD"));
  });

  it("should be able to undo a categorization", () => {
    let caughtEvent = null;
    let listener = {
      //@ts-ignore
      onTransactionUncategorized: function (event: OnTransactionUnassociated) {
        caughtEvent = event;
      },
    };

    const testObject = new SpectreUser();
    testObject.addCategory(new Category("Home"));

    let details = [];
    //@ts-ignore
    details.push(new TransactionDetail("Chase cc0392", "Bank"));
    //@ts-ignore
    details.push(new TransactionDetail("JAPANESE STEAKHOUSE", "Business"));
    //@ts-ignore
    details.push(TransactionDetail.withCurrency(new Currency(400)));
    let transaction = new Transaction(details);

    testObject.readyForCategorization(transaction);
    expect(testObject.getUncategorized().length).toBe(1);

    testObject.categorize(transaction, new Category("Home"));
    expect(testObject.getUncategorized().length).toBe(0);

    testObject.addTransactionUncategorizedListener(
      new Category("Home"),
      listener
    );
    testObject.uncategorize(transaction, new Category("Home"));
    expect(testObject.getUncategorized().length).toBe(1);
    expect(testObject.getTransactionsFor(new Category("Home")).length).toBe(0);

    //@ts-ignore
    expect(caughtEvent.transaction.equals(transaction)).toBe(true);
    //@ts-ignore
    expect(caughtEvent.category.equals(new Category("Home"))).toBe(true);

    caughtEvent = null;

    details = [];
    //@ts-ignore
    details.push(new TransactionDetail("Chase cc0392", "Bank"));
    //@ts-ignore
    details.push(new TransactionDetail("JAPANESE STEAKHOUSE", "Business"));
    //@ts-ignore
    details.push(TransactionDetail.withCurrency(new Currency(400)));

    transaction = new Transaction(details);
    testObject.readyForCategorization(transaction);
    testObject.categorize(transaction, new Category("Home"));

    testObject.removeTransactionUncategorizedListener(
      new Category("Home"),
      listener
    );
    testObject.uncategorize(transaction, new Category("Home"));
    expect(caughtEvent).toBeNull();
  });

  it("should put the most recent uncategorized transaction at the next transaction", () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category("Home"));

    const details = [];
    //@ts-ignore
    details.push(new TransactionDetail("Chase cc0392", "Bank"));
    //@ts-ignore
    details.push(new TransactionDetail("JAPANESE STEAKHOUSE", "Business"));
    //@ts-ignore
    details.push(TransactionDetail.withCurrency(new Currency(400)));
    const transaction = new Transaction(details);

    testObject.readyForCategorization(transaction);
    expect(testObject.getUncategorized().length).toBe(1);

    testObject.categorize(transaction, new Category("Home"));
    expect(testObject.getUncategorized().length).toBe(0);

    const otherTransaction = new Transaction([
      //@ts-ignore
      TransactionDetail.withCurrency(new Currency(400)),
    ]);
    testObject.readyForCategorization(otherTransaction);

    testObject.uncategorize(transaction, new Category("Home"));
    expect(testObject.getUncategorized()[0].equals(transaction)).toBe(true);
    expect(testObject.getUncategorized().length).toBe(2);
  });

  it("should emit an event when a transaction is ready to be categorized", () => {
    let caughtEvent = null;
    const listener = {
      onTransactionReadyForCategorization: function (event: OnTransactionReadyForCategorizationEvent) {
        caughtEvent = event;
      },
    };

    const testObject = new SpectreUser();
    testObject.addTransactionReadyForCategorizationListener(listener);

    //@ts-ignore
    const details = [TransactionDetail.withCurrency(new Currency(400))];
    const transaction = new Transaction(details);
    testObject.readyForCategorization(transaction);

    expect(testObject.getUncategorized().length).toBe(1);
    testObject.getUncategorized().pop();
    expect(testObject.getUncategorized().length).toBe(1);

    expect(caughtEvent).not.toBeNull();
    // @ts-ignore
    expect(caughtEvent.transaction).toEqual(transaction);

    testObject.removeTransactionReadyForCategorizationListener(listener);
    caughtEvent = null;
    testObject.readyForCategorization(transaction);
    expect(caughtEvent).toBeNull();
  });

  it("should emit an event when a new category is added", () => {
    let caughtEvent = null;
    const listener: CategoryAddedListener = {
      onCategoryAdded: function (event: OnCategoryAddedEvent) {
        caughtEvent = event;
      },
    };

    const testObject: SpectreUser = new SpectreUser();
    testObject.addOnCategoryAddedListener(listener);
    const category: Category = new Category("Home");
    testObject.addCategory(category.copy());

    // @ts-ignore
    expect(category.copy().equals(caughtEvent.category)).toBe(true);

    caughtEvent = null;
    testObject.removeOnCategoryAddedListener(listener);

    testObject.addCategory(new Category("New"));
    expect(caughtEvent).toBeNull();
  });

  it("should emit an event for a specific category when a transaction is associated to it", () => {
    let caughtEvent = undefined;
    const listener: TransactionCategorizedListener = {
      onTransactionCategorized: (event: OnTransactionCategorizedEvent) => {
        caughtEvent = event;
      },
    };

    const testObject: SpectreUser = new SpectreUser();
    const category: Category = new Category("Home");

    testObject.addCategory(category);

    testObject.addTransactionCategorizedListener(category, listener);
    const transaction = new Transaction([
      //@ts-ignore
      TransactionDetail.withCurrency(new Currency(400)),
    ]);
    testObject.readyForCategorization(transaction);
    testObject.categorize(transaction, category);

    // @ts-ignore
    expect(caughtEvent.transaction).toEqual(transaction);

    caughtEvent = null;
    testObject.removeTransactionCategorizedListener(
      new Category("TEST"),
      listener
    );
    testObject.categorize(transaction, category);
    // @ts-ignore
    expect(caughtEvent.transaction).toEqual(transaction);

    testObject.removeTransactionCategorizedListener(category, listener);
    caughtEvent = null;

    const newTransaction = new Transaction([
      //@ts-ignore
      TransactionDetail.withCurrency(new Currency(800)),
    ]);
    testObject.readyForCategorization(newTransaction);
    testObject.categorize(newTransaction, category);
    expect(caughtEvent).toBeNull();
  });

  it("should only remove transaction that was categorized", () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category("Home"));

    const currency = new Currency(400, "USD");
    const transaction = new Transaction([
      //@ts-ignore
      TransactionDetail.withCurrency(new Currency(400)),
    ]);

    for (let i = 0; i < 10; i++) {
      testObject.readyForCategorization(
        //@ts-ignore
        new Transaction([TransactionDetail.withCurrency(new Currency(400))])
      );
    }

    testObject.readyForCategorization(transaction);
    testObject.categorize(transaction, new Category("Home"));
    expect(testObject.getUncategorized().length).toBe(10);
  });

  it("should be able to delete a category without transactions", () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category("Home"));
    testObject.removeCategory(new Category("Home"));

    expect(testObject.getCategories().length).toBe(0);
  });

  it("should be able to delete a category with transactions", () => {
    let caughtEvent = null;
    const listener = {
      onCategoryRemoved: function (event: OnCategoryRemovedEvent) {
        caughtEvent = event;
      },
    };

    const testObject = new SpectreUser();
    testObject.addCategory(new Category("Home"));

    const details = [];
    //@ts-ignore
    details.push(new TransactionDetail("Test", "Test"));
    const transaction = new Transaction(details);

    testObject.readyForCategorization(transaction);
    testObject.categorize(transaction, new Category("Home"));
    expect(testObject.getUncategorized().length).toBe(0);

    testObject.addCategoryRemovedListener(listener);
    testObject.removeCategory(new Category("Home"));

    expect(testObject.getUncategorized().length).toBe(1);
    // @ts-ignore
    expect(caughtEvent.category.equals(new Category("Home"))).toBe(true);
    caughtEvent = null;

    testObject.removeCategoryRemovedListener(listener);
    testObject.addCategory(new Category("Test"));
    testObject.removeCategory(new Category("Test"));

    expect(caughtEvent).toBeNull();
  });

  it("should throw an exception if you try to delete a category that does not exist", () => {
    const testObject = new SpectreUser();

    let caughtException = null;
    try {
      testObject.removeCategory(new Category("Home"));
    } catch (e) {
      caughtException = e;
    }

    // @ts-ignore
    expect(caughtException.message).toBe(
      "Cannot remove a category that does not exist [Home]"
    );
  });

  it("should throw an exception if a user tries to categorize a transaction that was not ready", () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category("Home"));

    const currency = new Currency(400, "USD");
    const transaction = new Transaction([
      //@ts-ignore
      TransactionDetail.withCurrency(currency),
    ]);

    let caughtException = new Error();
    try {
      testObject.categorize(transaction, new Category("Home"));
    } catch (e) {
      caughtException = (e as Error);
    }

    expect(caughtException.message).toBe(
      "Must ready transaction for categorization"
    );
  });

  it("should throw an exception if two categories are added with the same name", () => {
    const testObject = new SpectreUser();

    testObject.addCategory(new Category("Home"));

    let caughtException = new Error();
    try {
      testObject.addCategory(new Category("Home"));
    } catch (e) {
      caughtException = (e as Error);
    }
    expect(caughtException.message).toBe("Category [Home] was already added");
  });

  it("should throw an exception if trying to categorize against something that dne", () => {
    const testObject = new SpectreUser();
    //@ts-ignore
    const transaction = new Transaction([new TransactionDetail("TEST", "A")]);

    testObject.readyForCategorization(transaction);

    let caughtException = new Error();
    try {
      testObject.categorize(transaction, new Category("Home"));
    } catch (e) {
      caughtException = (e as Error);
    }
    expect(caughtException.message).toBe(
      "[Home] category was not registered in user"
    );
  });

  it("should emit an event right before a category is removed", () => {
    const testObject = new SpectreUser();

    let caughtEvent = null;
    const listener = {
      onBeforeCategoryRemoved(event: OnCategoryRemovedEvent) {
        caughtEvent = event;
      },
    };

    testObject.addBeforeCategoryRemovedListener(listener);

    const category = new Category("TEST");
    testObject.addCategory(category);

    testObject.removeCategory(category);
    expect(caughtEvent).not.toBeNull();
    caughtEvent = null;

    testObject.removeBeforeCategoryRemovedListener(listener);
    testObject.addCategory(category);
    testObject.removeCategory(category);
    expect(caughtEvent).toBeNull();
  });

  it("should be able to tell what category is before another category when one exists", () => {
    const testObject = new SpectreUser();

    testObject.addCategory(new Category("A"));
    testObject.addCategory(new Category("B"));
    testObject.addCategory(new Category("C"));

    expect(
      //@ts-ignore
      testObject.getCategoryBefore(new Category("B")).equals(new Category("A"))
    ).toBe(true);
    //@ts-ignore
    expect(testObject.getCategoryBefore(new Category("A"))).toBeNull();
  });

  it("should throw an exception if a category that does not exist within the user is given for getCategoryBefore", () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category("A"));
    testObject.addCategory(new Category("B"));
    testObject.addCategory(new Category("C"));

    let caughtException = new Error();
    try {
      testObject.getCategoryBefore(new Category("D"));
    } catch (e) {
      caughtException = (e as Error);
    }

    expect(caughtException.message).toBe(
      "Cannot call getCategoryBefore on category that does not exist within user [D]"
    );
  });

  it("should throw an exception if a falsy category is given to getCategoryBefore", () => {
    const testObject = new SpectreUser();

    let caughtException = new Error();

    try {
      // @ts-ignore
      testObject.getCategoryBefore(null);
    } catch (e) {
      caughtException = (e as Error);
    }

    expect(caughtException.message).toBe(
      "Cannot call getCategoryBefore with a null or undefined category"
    );
  });

  it("should be able to tell what category is before another category when one exists", () => {
    const testObject = new SpectreUser();

    testObject.addCategory(new Category("A"));
    testObject.addCategory(new Category("B"));
    testObject.addCategory(new Category("C"));

    expect(
      // @ts-ignore
      testObject.getCategoryAfter(new Category("B")).equals(new Category("C"))
    ).toBe(true);
    expect(testObject.getCategoryAfter(new Category("C"))).toBeNull();
  });

  it("should be able to tell what category is before another category when one exists", () => {
    const testObject = new SpectreUser();

    testObject.addCategory(new Category("A"));
    testObject.addCategory(new Category("B"));
    testObject.addCategory(new Category("C"));

    expect(
      testObject.getCategoryBefore(new Category("B"))?.equals(new Category("A"))
    ).toBe(true);
    expect(testObject.getCategoryBefore(new Category("A"))).toBeNull();
  });

  it("should throw an exception if a category that does not exist within the user is given for getCategoryAfter", () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category("A"));
    testObject.addCategory(new Category("B"));
    testObject.addCategory(new Category("C"));

    let caughtException = new Error();
    try {
      testObject.getCategoryAfter(new Category("D"));
    } catch (e) {
      caughtException = (e as Error);
    }

    expect(caughtException.message).toBe(
      "Cannot call getCategoryAfter on category that does not exist within user [D]"
    );
  });

  it("should throw an exception if a falsy category is given to getCategoryAfter", () => {
    const testObject = new SpectreUser();

    let caughtException = new Error();

    try {
      //@ts-ignore
      testObject.getCategoryAfter(null);
    } catch (e) {
      caughtException = (e as Error);
    }

    expect(caughtException.message).toBe(
      "Cannot call getCategoryAfter with a null or undefined category"
    );
  });

  it("should transfer all transactions to correct category when name has changed", () => {
    const testObject = new SpectreUser();

    testObject.addCategory(new Category("Test"));
    const transaction = new Transaction([]);
    testObject.readyForCategorization(transaction);
    testObject.categorize(transaction, new Category("Test"));

    testObject.changeCategoryName(new Category("Test"), "New Test Name");

    const transactions = testObject.getTransactionsFor(
      new Category("New Test Name")
    );

    expect(transactions.length).toBe(1);
  });

  it('should be able to get the column names of a category', () => {
    const testObject = new SpectreUser();

    testObject.addCategory(new Category('Test'));

    const transaction = new Transaction([
      new TransactionDetail('Test', 'Test Column Name', STRING_TYPE),
      new TransactionDetail('Test', 'Test Column Name 2', STRING_TYPE)
    ]);
    testObject.readyForCategorization(transaction);
    testObject.categorize(transaction, new Category("Test"));

    const anotherTransaction = new Transaction([
      new TransactionDetail('Test', 'Test Column Name', STRING_TYPE),
      new TransactionDetail('Test', 'Test Column Name 2', STRING_TYPE)
    ]);

    const headerNames = testObject.getHeaderNamesFor(new Category("Test"));

    // @ts-ignore
    expect(headerNames.length).toBe(2);
    // @ts-ignore
    expect(headerNames.includes('Test Column Name')).toBeTruthy();
    // @ts-ignore
    expect(headerNames.includes('Test Column Name 2')).toBeTruthy();
  });

  it('should get an empty list if there are no transactions within the category', () => {
    const testObject = new SpectreUser();
    testObject.addCategory(new Category('Test'));
    const headerNames = testObject.getHeaderNamesFor(new Category("Test"));

    // @ts-ignore
    expect(headerNames.length).toBe(0);
  });

  it('should throw an exception if there is no category matching ', () => {
    const testObject = new SpectreUser();

    let caughtException = new Error();
    try {
      testObject.getHeaderNamesFor(new Category('Test'));
    } catch (e) {
      caughtException = (e as Error);
    }

    expect(caughtException.message).toBe('Cannot get header names from category [Test] that does not exist');
  });

  it('should be able to get all column headers in a scepter user', () => {
    const testObject = new SpectreUser();

    testObject.addCategory(new Category('Test'));
    testObject.addCategory(new Category('Test 1'));

    const transaction = new Transaction([
      new TransactionDetail('Test', 'Test Column Name', STRING_TYPE),
    ]);
    testObject.readyForCategorization(transaction);
    testObject.categorize(transaction, new Category("Test"));

    const anotherTransaction = new Transaction([
      new TransactionDetail('Test', 'Test Column Name 2', STRING_TYPE)
    ]);

    testObject.readyForCategorization(anotherTransaction);
    testObject.categorize(anotherTransaction, new Category('Test 1'));

    const headerNames = testObject.getHeaderNames();

    // @ts-ignore
    expect(headerNames.length).toBe(2);
    // @ts-ignore
    expect(headerNames.includes('Test Column Name')).toBeTruthy();
    // @ts-ignore
    expect(headerNames.includes('Test Column Name 2')).toBeTruthy();
  });
});
