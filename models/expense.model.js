const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ExpenseModel = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  expenseAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expenseDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expenseCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ExpenseModel;
