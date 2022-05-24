class InvalidAmountError extends Error {}
class InvalidDateError extends Error {}

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
    expense.date = this.validateDate(expense.date);

    this.expenses.push(expense);
    this.db.add(expense);

    this.notify();
  }

  editExpense({ amount, date, description, id }) {
    const expense = this.expenses.find((expense) => {
      return expense.id === id;
    });

    expense.amount = this.validateAmount(amount);
    expense.date = this.validateDate(date);
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
    if (amount.indexOf("$") === 0) {
      amount = amount.substring(1);
    }

    if (amount.length === 0) throw new InvalidAmountError();

    const matches = amount.match(/^(\d*)(\.\d{0,2})?$/);

    if (!matches) throw new InvalidAmountError();

    let [dollars, cents] = amount.split(".");

    if (dollars.length === 0) dollars = "0";

    if (!cents || cents.length === 0) cents = "00";

    if (cents && cents.length === 1) cents += "0";

    return `${dollars}.${cents}`;
  }

  validateDate(date) {
    const matches = date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);

    if (!matches) throw new InvalidDateError();

    let [month, day, year] = date.split("/");

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    const timestamp = Date.parse(`${year}-${month}-${day}`);
    if (isNaN(timestamp)) throw new InvalidDateError();

    return [month, day, year].join("/");
  }
}
