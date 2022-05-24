class InvalidAmountError extends Error {}

class ExpenseModel {
  constructor(db) {
    this.expenses = db.all();
    this.subscribers = [];

    this.db = db;
  }

  all() {
    return [...this.expenses];
  }

  addExpense(expense) {
    expense.id = this.generateId();
    expense.amount = this.validateAmount(expense.amount);

    this.expenses.push(expense);
    this.db.add(expense);

    this.notify();
  }

  editExpense({ amount, date, description, id }) {
    const expense = this.expenses.find((expense) => {
      return expense.id === id;
    });

    expense.amount = this.validateAmount(amount);
    expense.date = date;
    expense.description = description;

    this.db.editExpense(expense);
    this.notify();
  }

  removeExpense(expenseId) {
    this.expenses = this.expenses.filter((expense) => {
      return expense.id !== expenseId;
    });

    this.db.remove(expenseId);
    this.notify();
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);

    subscriber.notify();
  }

  generateId() {
    const timestamp = new Date().getTime();

    return JSON.stringify(timestamp);
  }

  notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  }

  validateAmount(amount) {
    if (amount.length === 0) throw new InvalidAmountError();

    return amount;
  }
}
