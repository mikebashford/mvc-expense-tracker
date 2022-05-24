class ExpenseController {
  constructor(view) {
    this.DOM = view.getDOM();
    this.setUpEventHandlers();
  }

  setUpEventHandlers() {
    this.DOM.expenseForm.addEventListener("submit", this.addExpense);
  }

  addExpense(event) {
    event.preventDefault();

    console.log("form submitted");
  }
}
