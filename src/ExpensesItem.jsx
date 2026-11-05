import { useState } from "react";

function ExpensesItem(props){
    
  
return(
  <>
  <div className="expense-details">

      <p>title:{props.expense.title}</p>
      <p>amount:{props.expense.amount}</p>
      <p>category:{props.expense.category}</p>
      <p>date:{props.expense.date}</p>

      <button onClick={()=>props.deleteExpense(props.expense.id)} className="delete-btn">delete expense</button>
  </div>
    
  </>
  );
}

export default ExpensesItem