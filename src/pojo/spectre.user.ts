import { Currency } from "./currency";
import { Category } from "./category";
import { Transaction, AMOUNT_TYPE } from "./transaction";

export class SpectreUser {
  categories: Category[];
  uncategorized: Transaction[];

  onCategoryAddedListeners: CategoryAddedListener[];
  onCategoryRemovedListeners: CategoryRemovedListener[];
  onBeforeCategoryRemovedListeners: BeforeCategoryRemovedListener[];
  onCategoryNameChangeListeners: CategoryNameChangeListener[];

  onTransactionCategorizedListeners: ListenerCategoryMapping[];
  onTransactionUncategorizedListeners: TransactionUncategorizedListener[];

  transactionReadyForCategorizationListeners : TransactionReadyForCategorizationListener[];

  currentListenerId: number;
  currentTransactionId: number;

  constructor() {
    this.categories = [];
    this.uncategorized = [];

    this.transactionReadyForCategorizationListeners = [];
    this.onCategoryAddedListeners = [];
    this.onCategoryRemovedListeners = [];
    this.onBeforeCategoryRemovedListeners = [];
    this.onTransactionCategorizedListeners = [];
    this.onTransactionUncategorizedListeners = [];
    this.onCategoryNameChangeListeners = [];
    this.currentListenerId = 0;

    this.currentTransactionId = 0;
  }

  getCategories() {
    const copied = [];
    for (let i = 0; i < this.categories.length; i++) {
      copied.push(this.categories[i].copy());
    }
    return copied;
  }

  changeCategoryName(toChange: Category, newName: string) {
    if (toChange.equals(new Category(newName))) {
      return;
    }

    this.assertCategoryDoesNotExist(new Category(newName));

    const savedOffCategory = toChange.copy();

    const category = this._getCategory(toChange);
    // @ts-ignore
    category.setName(newName);

    for (let i = 0; i < this.onCategoryNameChangeListeners.length; i++) {
      // @ts-ignore
      const event = new OnCategoryNameChangeEvent(savedOffCategory.copy(), category.copy(), newName);
      const listener = this.onCategoryNameChangeListeners[i];
      listener.onCategoryNameChange(event);
    }
  }

  addOnCategoryNameChangeListener(listener: CategoryNameChangeListener) {
    this.onCategoryNameChangeListeners.push(listener);
    // @ts-ignore
    listener.__listenerId = ++this.currentListenerId;
  }

  removeOnCategoryNameChangeListener(listener: CategoryNameChangeListener) {
    this.onCategoryNameChangeListeners = this.onCategoryNameChangeListeners.filter(
      (inner: CategoryNameChangeListener) => {
        // @ts-ignore
        return listener.__listenerId !== inner.__listenerId;
      }
    );
  }

  getTransactionsFor(category: Category) {
    const found = this._getCategory(category);
    // @ts-ignore
    return found.getTransactions();
  }

  getTransactions() {
    const transactions = [];
    const categories = this.getCategories();
    for (let i = 0; i < categories.length; i++) {
      transactions.push(...this.getTransactionsFor(categories[i]));
    }
    return transactions;
  }

  getUncategorized() {
    const copied = [];
    for (let i = 0; i < this.uncategorized.length; i++) {
      copied.push(this.uncategorized[i].copy());
    }

    return copied;
  }

  readyForCategorization(transaction: Transaction) {
    transaction.id = this.currentTransactionId;
    this.currentTransactionId++;
    this.uncategorized.push(transaction.copy());

    for (
      let i = 0;
      i < this.transactionReadyForCategorizationListeners.length;
      i++
    ) {
      const event = new OnTransactionReadyForCategorizationEvent(transaction);
      const listener = this.transactionReadyForCategorizationListeners[i];
      // @ts-ignore
      listener.onTransactionReadyForCategorization(event);
    }
  }

  // @ts-ignore
  addTransactionReadyForCategorizationListener(listener) {
    this.transactionReadyForCategorizationListeners.push(listener);
    listener.__id = this.currentListenerId;
    this.currentListenerId++;
  }

  // @ts-ignore
  removeTransactionReadyForCategorizationListener(listener) {
    this.transactionReadyForCategorizationListeners = this.transactionReadyForCategorizationListeners.filter(
      function (inner) {
        // @ts-ignore
        return listener.__id !== inner.__id;
      }
    );
  }

  hasCategory(category: Category) {
    let hasCategory = false;
    for (let i = 0; i < this.categories.length; i++) {
      if (category.equals(this.categories[i])) {
        hasCategory = true;
        break;
      }
    }
    return hasCategory;
  }

  addCategory(category: Category) {
    this.assertCategoryDoesNotExist(category);
    this.categories.push(category.copy());

    for (let i = 0; i < this.onCategoryAddedListeners.length; i++) {
      this.onCategoryAddedListeners[i].onCategoryAdded(
        new OnCategoryAddedEvent(category.copy())
      );
    }
  }

  assertCategoryDoesNotExist(category: Category) {
    const found = this._getCategory(category);
    if (found) {
      throw new Error(
        "Category [" + category.getName() + "] was already added"
      );
    }
  }

  addOnCategoryAddedListener(listener: CategoryAddedListener) {
    this.onCategoryAddedListeners.push(listener);
    // @ts-ignore
    listener.__onCategoryAddedListenerId = this.currentOnCategoryAddedListenerId;
  }

  removeOnCategoryAddedListener(listener: CategoryAddedListener) {
    this.onCategoryAddedListeners = this.onCategoryAddedListeners.filter(
      function (inner) {
        return (
          // @ts-ignore
          listener.__onCategoryAddedListenerId !==
          // @ts-ignore
          inner.__onCategoryAddedListenerId
        );
      }
    );
  }

  removeCategory(category: Category) {
    const removed = this._getCategory(category);
    if (!removed) {
      throw new Error(
        "Cannot remove a category that does not exist [" +
        category.getName() +
        "]"
      );
    }

    const nowUncategorized = removed.getTransactions();
    for (let i = 0; i < nowUncategorized.length; i++) {
      const transaction = nowUncategorized[i];
      this.uncategorize(transaction, category);
    }

    for (let i = 0; i < this.onBeforeCategoryRemovedListeners.length; i++) {
      const listener = this.onBeforeCategoryRemovedListeners[i];
      listener.onBeforeCategoryRemoved(
        new OnBeforeCategoryRemovedEvent(category)
      );
    }

    this.categories = this.categories.filter(function (inner) {
      return !category.equals(inner);
    });

    for (let i = 0; i < this.onCategoryRemovedListeners.length; i++) {
      this.onCategoryRemovedListeners[i].onCategoryRemoved(
        new OnCategoryRemovedEvent(removed)
      );
    }
  }

  addCategoryRemovedListener(listener: CategoryRemovedListener) {
    this.onCategoryRemovedListeners.push(listener);
    // @ts-ignore
    listener.__categoryRemovedListenerId = this.currentListenerId;
    this.currentListenerId++;
  }

  removeCategoryRemovedListener(listener: CategoryRemovedListener) {
    this.onCategoryRemovedListeners = this.onCategoryRemovedListeners.filter(
      function (inner) {
        return (
          // @ts-ignore
          listener.__categoryRemovedListenerId !==
          // @ts-ignore
          inner.__categoryRemovedListenerId
        );
      }
    );
  }

  addBeforeCategoryRemovedListener(listener: BeforeCategoryRemovedListener) {
    this.onBeforeCategoryRemovedListeners.push(listener);
    // @ts-ignore
    listener._beforeCategoryRemovedListenerId = this.currentListenerId;
    this.currentListenerId++;
  }

  removeBeforeCategoryRemovedListener(listener: BeforeCategoryRemovedListener) {
    this.onBeforeCategoryRemovedListeners = this.onBeforeCategoryRemovedListeners.filter(
      (inner) => {
        return (
          // @ts-ignore
          listener.__beforeCategoryRemovedListenerId !=
          // @ts-ignore
          inner.__beforeCategoryRemovedListenerId
        );
      }
    );
  }

  hasAnotherTransaction() {
    const categories = this.getUncategorized();
    return categories.length !== 0;
  }

  getNextTransaction() {
    const uncategorized = this.getUncategorized();
    const transaction = uncategorized.shift();
    return transaction;
  }

  categorize(transaction: Transaction, category: Category) {
    const found = this._getCategory(category);
    if (!found) {
      throw new Error(
        "[" + category.getName() + "] category was not registered in user"
      );
    }

    if (!transaction.isCategorized()) {
      throw new Error("Must ready transaction for categorization");
    }

    this.uncategorized = this.uncategorized.filter(function (inner) {
      return !inner.equals(transaction);
    });

    found.associate(transaction);

    const listeners = this._getListenersForCategory(
      this.onTransactionCategorizedListeners,
      category
    );
    for (let i = 0; i < listeners.length; i++) {
      listeners[i].onTransactionCategorized(
        new OnTransactionCategorizedEvent(found.copy(), transaction)
      );
    }
  }

  _getListenersForCategory(
    mappings: ListenerCategoryMapping[] | TransactionUncategorizedListener | [],
    category: Category
  ) {
    const listeners = [];

    // @ts-ignore
    for (let i = 0; i < mappings.length; i++) {
      // @ts-ignore
      const mapping = mappings[i];
      if (mapping.category.equals(category)) {
        listeners.push(mapping.listener);
      }
    }
    return listeners;
  }

  addTransactionCategorizedListener(
    category: Category,
    listener: TransactionCategorizedListener
  ) {
    const mapping = new ListenerCategoryMapping(category, listener);
    this.onTransactionCategorizedListeners.push(mapping);

    // @ts-ignore
    listener.__id = this.currentListenerId;
    this.currentListenerId++;
  }

  removeTransactionCategorizedListener(
    category: Category,
    listener: TransactionCategorizedListener
  ) {
    const removeCheck = new ListenerCategoryMapping(category, listener);

    this.onTransactionCategorizedListeners = this.onTransactionCategorizedListeners.filter(
      function (mapping) {
        return !removeCheck.equals(mapping);
      }
    );
  }

  uncategorize(transaction: Transaction, category: Category) {
    const found = this._getCategory(category);
    // @ts-ignore
    found.unassociate(transaction);

    this.uncategorized.splice(0, 0, transaction.copy());

    const listeners = this._getListenersForCategory(
      // @ts-ignore
      this.onTransactionUncategorizedListeners,
      category
    );
    for (let i = 0; i < listeners.length; i++) {
      listeners[i].onTransactionUncategorized(
        // @ts-ignore
        new OnTransactionUncategorizedEvent(found, transaction)
      );
    }
  }

  addTransactionUncategorizedListener(
    category: Category,
    listener: TransactionUncategorizedListener
  ) {
    // @ts-ignore
    const mapping = new ListenerCategoryMapping(category, listener);
    // @ts-ignore
    this.onTransactionUncategorizedListeners.push(mapping);
    // @ts-ignore
    listener.__id = this.currentListenerId;
    this.currentListenerId++;
  }

  removeTransactionUncategorizedListener(
    category: Category,
    listener: TransactionUncategorizedListener
  ) {
    // @ts-ignore
    const removeCheck = new ListenerCategoryMapping(category, listener);

    this.onTransactionUncategorizedListeners = this.onTransactionUncategorizedListeners.filter(
      function (mapping) {
        // @ts-ignore
        return !removeCheck.equals(mapping);
      }
    );
  }

  rollup(category: Category | string, headerName? : string) {

    if (category instanceof Category && !headerName) {
      throw new Error('If using a category, must provide a header name');
    }

    const rollupCategory = (toRollup : Category, headerName : string) => {
      let computed = new Currency(0, "USD");
      const found = this._getCategory(toRollup);
  
      // @ts-ignore
      const transactions = found.getTransactions();
  
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const details = transaction.getDetailsByColumnName(headerName);
  
        for (let detail of details) {
          // @ts-ignore
          computed = computed.add(detail.asGivenType());
        }
      }
      return computed;
    }

    let computed = new Currency(0, "USD");

    if (category instanceof Category) {
      if (headerName) {
        computed = rollupCategory(category, headerName);
      }
    } else {
      for (let inner of this.categories) {
        computed = computed.add(rollupCategory(inner, category));
      }
    }

    return computed;
  }

  _getCategory(category: Category) {
    let found = null;

    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].equals(category)) {
        found = this.categories[i];
        break;
      }
    }

    return found;
  }

  indexOfCategory(category: Category) {
    const categories = this.getCategories();

    let foundIndex = -1;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].equals(category)) {
        foundIndex = i;
        break;
      }
    }

    return foundIndex;
  }

  getCategoryBefore(category: Category) {
    if (!category) {
      throw new Error(
        "Cannot call getCategoryBefore with a null or undefined category"
      );
    }

    const found = this._getCategory(category);
    if (!found) {
      throw new Error(
        "Cannot call getCategoryBefore on category that does not exist within user [" +
        category.getName() +
        "]"
      );
    }

    const categories = this.getCategories();

    const foundIndex = this.indexOfCategory(category);
    if (foundIndex === 0) {
      return null;
    }

    return categories[foundIndex - 1];
  }

  getCategoryAfter(category: Category) {
    if (!category) {
      throw new Error(
        "Cannot call getCategoryAfter with a null or undefined category"
      );
    }

    const found = this._getCategory(category);
    if (!found) {
      throw new Error(
        "Cannot call getCategoryAfter on category that does not exist within user [" +
        category.getName() +
        "]"
      );
    }

    const categories = this.getCategories();
    const foundIndex = this.indexOfCategory(category);

    if (foundIndex === categories.length - 1) {
      return null;
    }

    return categories[foundIndex + 1];
  }

  getHeaderNamesFor(category : Category) {
    const found = this._getCategory(category);

    if (!found) {
      throw new Error(`Cannot get header names from category [${category.getName()}] that does not exist`);
    }

    return found.getHeaderNames(); 
  }

  getHeaderNames() {

    const headerNames = new Array<string>();

    const categories = this.getCategories();
    for (let category of categories) {
      for (let headerName of this.getHeaderNamesFor(category)) {
        headerNames.push(headerName);
      }
    }
    return headerNames;
  }
}

export interface TransactionReadyForCategorizationListener {
  onTransactionReadyForCategorization: (event: OnTransactionCategorizedEvent) => void;
}

export class OnTransactionReadyForCategorizationEvent {
  transaction : Transaction;

  constructor(transaction : Transaction) {
    this.transaction = transaction.copy();
  }
}

export interface CategoryAddedListener {
  onCategoryAdded: (event: OnCategoryAddedEvent) => void;
}

export class OnCategoryAddedEvent {
  category: Category;

  constructor(category: Category) {
    this.category = category.copy();
  }
}

export interface CategoryRemovedListener {
  onCategoryRemoved: (event: OnCategoryRemovedEvent) => void;
}

export class OnCategoryRemovedEvent {
  category: Category;

  constructor(category: Category) {
    this.category = category.copy();
  }
}

export interface BeforeCategoryRemovedListener {
  onBeforeCategoryRemoved: (event: OnBeforeCategoryRemovedEvent) => void;
}

export class OnBeforeCategoryRemovedEvent {
  category: Category;

  constructor(category: Category) {
    this.category = category.copy();
  }
}

export interface TransactionCategorizedListener {
  onTransactionCategorized: (event: OnTransactionCategorizedEvent) => void;
}

export class OnTransactionCategorizedEvent {
  category: Category;
  transaction: Transaction;

  constructor(category: Category, transaction: Transaction) {
    this.category = category.copy();
    this.transaction = transaction.copy();
  }
}

export interface TransactionUncategorizedListener {
  onTransactionUncategorized: (event: OnTransactionUncategorizedEvent) => void;
}

export class OnTransactionUncategorizedEvent {
  category: Category;
  transaction: Transaction;

  constructor(category: Category, transaction: Transaction) {
    this.category = category.copy();
    this.transaction = transaction.copy();
  }
}

class ListenerCategoryMapping {
  category: Category;
  listener: TransactionCategorizedListener;

  constructor(category: Category, listener: TransactionCategorizedListener) {
    this.category = category.copy();
    this.listener = listener;
  }

  equals(mapping: ListenerCategoryMapping) {
    const areCategoryEquals = this.category.equals(mapping.category);
    // @ts-ignore
    const areListenerEquals = this.listener.__id === mapping.listener.__id;
    return areCategoryEquals && areListenerEquals;
  }
}

export interface CategoryNameChangeListener {
  onCategoryNameChange: (event: OnCategoryNameChangeEvent) => void;
}

export class OnCategoryNameChangeEvent {
  oldCategory: Category;
  newCategory: Category;
  newName: string;

  constructor(oldCategory: Category, newCategory: Category, newName: string) {
    this.oldCategory = oldCategory.copy();
    this.newCategory = newCategory.copy();
    this.newName = newName;
  }
}
