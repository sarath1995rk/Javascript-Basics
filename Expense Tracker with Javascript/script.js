document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses =    JSON.parse(localStorage.getItem('expenses')) || [];
  let totalAmount = calculateTotal();

  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      renderExpenses();
      updateTotal();

      saveExpensesToLocal();
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        expenses = expenses.filter((e) => e.id !== expense.id);
        renderExpenses();
        updateTotal();
        saveExpensesToLocal();
      });
      li.appendChild(deleteBtn);
      expenseList.appendChild(li);
    });
  }

  function calculateTotal() {
    return expenses.reduce(
      (accumulator, expense) => accumulator + expense.amount,
      0
    );
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }
});
