import ExpensesItem from "./ExpensesItem";
import { useState } from "react";
import "./App.css"

function App(){
  let [expense,setExpense]=useState([
    
  ]);
  let [newExpense,setNewExpense]=useState({
    id:"",
    title:"",
    amount:"",
    category:"",
    date:""
  });
  let [earning,setEarning] = useState(30000);
  let [newEarning, setNewEarning] = useState("");
  let [darkMode,setDarkMode] = useState(false);
  

  const updateEarning=(event)=>{
    setNewEarning(event.target.value);
  }
   const addEarning = () => {
  if (!newEarning || Number(newEarning) <= 0) return;

  setEarning(prevEarning=>prevEarning+Number(newEarning));
  setNewEarning("");
};
  
  

  const updateSetNewId=(event)=>{
    setNewExpense({...newExpense,id:event.target.value});
  }
  const updateSetNewTitle=(event)=>{
    setNewExpense({...newExpense,title:event.target.value});
  }
  const updateSetNewAmount=(event)=>{
    setNewExpense({...newExpense,amount:event.target.value});
  }
  const updateSetNewCategory=(event)=>{
    setNewExpense({...newExpense,category:event.target.value});
  }
  const updateSetNewDate=(event)=>{
    setNewExpense({...newExpense,date:event.target.value});
  }


  let totalExpenses=expense.reduce((accumulator,currentItem)=>{
    return accumulator+currentItem.amount},0);

  const addExpense = () => {
  if (!newExpense.title || !newExpense.amount) return;

  setExpense([...expense, {
    ...newExpense,
    id: Date.now(),
    amount: Number(newExpense.amount)
  }]);

  setNewExpense({
    id: "",
    title: "",
    amount: "",
    category: "",
    date: ""
  });
};

  const deleteExpense = (id) => {
    setExpense(expense.filter((item) => item.id !== id));
  }

  let expenses = expense.map((item)=>(
    <ExpensesItem key={item.id} expense={item} deleteExpense={deleteExpense} />
  ));
  let remainingBalance = earning-totalExpenses;

  const toggleDarkMode = ()=> {
    setDarkMode(prevDarkMode=>!prevDarkMode);
  }
return (
  <div className={darkMode?"dark-app-container":"app-container"}>

      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Manage your daily expenses</p>
      </header>
      <div className="expenses-cards">
      <div className="total-expense">
        <p className="total-label">Total Expenses</p>
        <h1 className="total-amount">Rs.{[totalExpenses]}</h1>
        <p className="total-desc">Your total recorded spending</p>
      </div>
       <div className="remaining-balance">
        <p className="remaining-balance-label">Remaining Balance</p>
        <h1 className="ramaining-balance-amount">Rs.{[remainingBalance]}</h1>
        <p className="remaining-balance-desc">Your total earning</p>
      </div>
      <div className="total-earning">
        <h3 className="total-earning-label">Total Earning</h3>
        <h1 className="total-earning-amount">Rs.{[earning]}</h1>
        <p className="total-earning-desc">Your total earning</p>
      </div>
      <div className="add-earning">
        <input type="number" className="earning-input" placeholder="add earning" onChange={updateEarning} value={newEarning}/>
        <button className="add-earning-btn" onClick={addEarning}>Add</button>
      </div>
     
    </div>

    <main className="main-content">

      <section className="expense-list">
        <h2>Recent Expenses</h2>
        {expenses}
      </section>

      <section className="expense-form">
        <h2>Add New Expense</h2>

        <div className="inputs">
          <input type="text" placeholder="Title" onChange={updateSetNewTitle} />
          <input type="number" placeholder="Amount" onChange={updateSetNewAmount} />
          <input type="text" placeholder="Category" onChange={updateSetNewCategory} />
          <input type="date" onChange={updateSetNewDate} />

          <button onClick={addExpense} className="add-expenses-btn">
            Add Expense
          </button>

        </div>

      </section>

    </main>
<div className="mode-btn-container">
    <button className="dark-mode-btn" onClick={toggleDarkMode}>{darkMode?"Light":"Dark"}</button>
   
</div>
</div>
);
}

export default App;