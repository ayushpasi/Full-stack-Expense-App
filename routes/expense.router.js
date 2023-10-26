const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expense.controller");

router.post("/save", expenseController.save);
router.get("/fetch", expenseController.fetch);
router.delete("/delete/:id", expenseController.deleteexpense);
module.exports = router;
