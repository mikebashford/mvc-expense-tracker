class ExpenseModel {
  constructor() {
    this.expenses = [];
    this.subscribers = [];
  }

  all() {
    return [...this.expenses];
  }

  addExpense(expense) {
    this.expenses.push(expense);
    this.subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
