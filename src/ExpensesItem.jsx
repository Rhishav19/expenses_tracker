
function ExpensesItem(props) {
  return (
    <div className="expense-details">

      <div className="expense-info">
        <h3>{props.expense.title}</h3>

        <div className="expense-meta">
          <span>{props.expense.category}</span>
          <span>{props.expense.date}</span>
        </div>
      </div>

      <div className="expense-actions">
        <h3 className="expense-amount">
          - Rs. {props.expense.amount}
        </h3>

        <button
          onClick={() => props.deleteExpense(props.expense.id)}
          className="delete-btn"
        >
          Delete
        </button>
        <button className="edit-btn" onClick={()=>props.editExpense(props.expense)}>Edit</button>
      </div>

    </div>
  );
}

export default ExpensesItem;
