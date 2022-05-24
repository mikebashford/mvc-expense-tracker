class ExpenseView {
  constructor(model) {
    this.DOM = this.selectDOMElements();
    this.model = model;

    this.model.subscribe(this);
  }

  selectDOMElements() {
    return {
      expenseForm: document.getElementById("new-expense-form"),
      expenses: document.getElementById("expenses"),
    };
  }

  getDOM() {
    return Object.assign({}, this.DOM);
  }

  notify() {
    this.DOM.expenses.innerHTML = "";
    this.model.all().forEach((expense) => {
      const description = this.makeExpenseField(expense.description);
      const date = this.makeExpenseField(expense.date);
      const amount = this.makeExpenseField("$" + expense.amount);
      const expenseRow = `
      <div class="expense">
        ${description}
        ${date}
        ${amount}
      </div>`;

      this.DOM.expenses.innerHTML += expenseRow;
    });
  }

  makeExpenseField(value) {
    return `
    <div class="field">
      <h2>${value}</h2>
    </div>
    `;
  }
}
