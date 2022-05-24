const model = new ExpenseModel();
const view = new ExpenseView(model);
const controller = new ExpenseController(view, model);
