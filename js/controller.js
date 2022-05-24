class ExpenseController {
  constructor(view, model) {
    this.DOM = view.getDOM();
    this.model = model;
    this.view = view;
    this.addExpense = this.addExpense.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.setExpenseEditable = this.setExpenseEditable.bind(this);
    this.setUpEventHandlers();
  }

  setUpEventHandlers() {
    this.DOM.expenseForm.addEventListener("submit", this.addExpense);

    [...this.DOM.deleteButtons].forEach((deleteButton) => {
      deleteButton.addEventListener("click", this.removeExpense);
    });

    [...this.DOM.editButtons].forEach((editButton) => {
      editButton.addEventListener("click", this.setExpenseEditable);
    });
  }

  addExpense(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const {
      amount: { value: amount },
      date: { value: date },
      description: { value: description },
    } = form;

    this.model.addExpense({
      amount,
      date,
      description,
    });
  }

  removeExpense(event) {
    const button = event.currentTarget;
    const expenseId = button.attributes["data-id"].value;

    this.model.removeExpense(expenseId);
  }

  setExpenseEditable(event) {
    const button = event.currentTarget;
    const expenseId = button.attributes["data-id"].value;

    this.view.setExpenseEditable(expenseId);
  }
}
