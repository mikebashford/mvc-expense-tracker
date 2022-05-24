class ExpenseController {
  constructor(view, model) {
    this.DOM = view.getDOM();
    this.model = model;
    this.view = view;
    this.addExpense = this.addExpense.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
    this.setExpenseEditable = this.setExpenseEditable.bind(this);
    this.unsetExpenseEditable = this.unsetExpenseEditable.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.model.subscribe(this);
  }

  setUpEventHandlers() {
    this.DOM.expenseForm.addEventListener("submit", this.addExpense);
    this.DOM.expenseForm.addEventListener("reset", this.hideErrorMessage);

    [...this.DOM.deleteButtons].forEach((deleteButton) => {
      deleteButton.addEventListener("click", this.removeExpense);
    });

    [...this.DOM.editButtons].forEach((editButton) => {
      editButton.addEventListener("click", this.setExpenseEditable);
    });

    [...this.DOM.editForms].forEach((editForm) => {
      editForm.addEventListener("reset", this.unsetExpenseEditable);
    });

    [...this.DOM.editForms].forEach((editForm) => {
      editForm.addEventListener("submit", this.editExpense);
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

    try {
      this.model.addExpense({
        amount,
        date,
        description,
      });
      this.view.hideErrorMessage();
    } catch (error) {
      this.displayErrorMessage(error);
    }
  }

  editExpense(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const id = form.attributes["data-id"].value;

    const {
      amount: { value: amount },
      date: { value: date },
      description: { value: description },
    } = form;

    try {
      this.model.editExpense({
        amount,
        date,
        description,
        id,
      });
      this.view.hideErrorMessage();
      this.view.unsetExpenseEditable(id);
      this.setUpEventHandlers();
    } catch (error) {
      this.displayErrorMessage(error);
    }
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
    this.setUpEventHandlers();
  }

  unsetExpenseEditable(event) {
    const form = event.currentTarget;
    const expenseId = form.attributes["data-id"].value;

    this.view.hideErrorMessage();
    this.view.unsetExpenseEditable(expenseId);
    this.setUpEventHandlers();
  }

  hideErrorMessage() {
    this.view.hideErrorMessage();
  }

  displayErrorMessage(error) {
    if (error instanceof InvalidAmountError) {
      this.view.displayAmountErrorMessage();
    } else {
      this.view.displayDateErrorMessage();
    }
  }

  notify() {
    this.setUpEventHandlers();
  }
}
