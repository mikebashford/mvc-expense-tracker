const view = new ExpenseView();
const model = new ExpenseModel();
const controller = new ExpenseController(view, model);

console.log(view.getDOM());
