const Expense = require("../models/Expense");

exports.getExpenses = (req, res, next) => {
    Expense.findAll().then((expense) => {
        res.json(expense);
    });
};

exports.updateExpenses = (req, res, next) => {
    let expenseId = req.params.id;
    const title = req.body.expenseDetail.title;
    const amount = req.body.expenseDetail.amount;
    const description = req.body.expenseDetail.description;
    Expense.update(
        { title: title, amount: amount, description: description },
        { where: { id: expenseId } }
    )
        .then((expense) => {
            res.redirect("api/expenses");
        })
        .catch((err) => console.log(err));
};

exports.postExpenses = (req, res, next) => {
    console.log(req.body);
    const title = req.body.expenseDetail.title;
    const amount = req.body.expenseDetail.amount;
    const description = req.body.expenseDetail.description;
    Expense.create({ title: title, amount: amount, description: description })
        .then(() => {
            console.log("Data successfully inserted :-)");
            res.redirect("api/expenses");
        })
        .catch((err) => console.log(err));
};

exports.deleteExpenses = (req, res, next) => {
    let expenseId = req.params.id;
    Expense.destroy({ where: { id: expenseId } })
        .then(() => {
            res.redirect("api/expenses");
        })
        .catch((err) => console.log(err));
};
