class ExpenseView {
  constructor() {
    this.DOM = this.selectDOMElements();
  }

  selectDOMElements() {
    return {
      expenseForm: document.getElementById("new-expense-form"),
    };
  }

  getDOM() {
    return Object.assign({}, this.DOM);
  }
}
