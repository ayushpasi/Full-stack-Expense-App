const form = document.getElementById("my-form");
const expensesList = document.getElementById("expenses");

form.addEventListener("submit", saveData);

async function saveData(e) {
  e.preventDefault();
  let expenseAmount = document.getElementById("expenseAmount").value;
  let expenseDescription = document.getElementById("expenseDescription").value;
  let expenseCategory = document.getElementById("expenseCategory").value;
  let expense = {
    expenseAmount: expenseAmount,
    expenseDescription: expenseDescription,
    expenseCategory: expenseCategory,
  };

  try {
    const response = await axios.post(
      "http://localhost:4000/expense/save",
      expense
    );
    console.log(response.data.newExpense);
    // Assuming the server sends back the newly created expense
    displayExpenses(response.data.newExpense);
  } catch (error) {
    console.error(error);
  }
}

function displayExpenses(expense) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item mb-3";
  listItem.textContent = `Expense: 
    Amount: ${expense.expenseAmount}, 
    Description: ${expense.expenseDescription}, 
    Category: ${expense.expenseCategory}`;
  const btn = document.createElement("button");
  btn.textContent = "delete";
  btn.className = "btn btn-danger mx-2";
  btn.addEventListener("click", () => {
    expensesList.removeChild(listItem);
    console.log("id" + expense.id);
    axios
      .delete("http://localhost:4000/expense/delete/" + expense.id)
      .then((res) => {
        console.log("Deleted succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // Add a click event listener to delete this expense, you can implement this.
  const update = document.createElement("button");
  update.textContent = "update";
  update.className = "btn btn-primary";
  // Add a click event listener to update this expense, you can implement this.
  listItem.appendChild(btn);
  listItem.appendChild(update);
  expensesList.appendChild(listItem);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/expense/fetch")
    .then((res) => {
      console.log("fetched:" + res.data);
      var data = res.data;
      data.forEach((item) => {
        displayExpenses(item);
      });
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
});
