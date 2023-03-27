const express = require("express");
const router = express.Router();
const expenseController = require("../Controllers/Expense");

router.get("/expenses", expenseController.getExpenses);

router.post("/expenses", expenseController.postExpenses);

router.delete("/expenses/:id", expenseController.deleteExpenses);

router.put("/expenses/:id", expenseController.updateExpenses);

module.exports = router;
