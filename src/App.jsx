import ExpensesItem from "./ExpensesItem";
import { useState,useEffect } from "react";
import "./App.css"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function App(){
  let [expense,setExpense]=useState(()=>{
    let myexpense=localStorage.getItem("myexpenses");
    if(myexpense){
      return JSON.parse(myexpense)
    }
    else{
      return [];
    }
  });
  useEffect(()=>{
    localStorage.setItem("myexpenses",JSON.stringify(expense))},[expense]);

  let [newExpense,setNewExpense]=useState({
    id:"",
    title:"",
    amount:"",
    category:"",
    date:""
  });
  let [earning,setEarning] = useState(()=>{
    let myearnings=localStorage.getItem("myearning");
    if(myearnings){
      return Number(myearnings);
    }
    else{
      return 0;
    }
  });
  useEffect(()=>{
    localStorage.setItem(("myearning"),earning)});
  let [newEarning, setNewEarning] = useState("");
  let [darkMode,setDarkMode] = useState(false);
  let [searchTerm, setSearchTerm] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("all");
  let [sortOrder,setSortOrder] = useState("newest");


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

  let categoryTotals = expense.reduce((totals, item) => {
  let category = item.category || "Uncategorized";

  totals[category] = (totals[category] || 0) + Number(item.amount);

  return totals;
  }, {});

  let chartData = Object.entries(categoryTotals).map(
  ([category, amount]) => ({
    name: category,
    value: amount
  })
);

  

  let categoryAnalytics = Object.entries(categoryTotals).map(
  ([category, amount]) => (
    <div className="analytics-item" key={category}>
      <h3>{category}</h3>
      <p>Rs. {amount}</p>
    </div>
  )
);

 
const addExpense = () => {
  if (!newExpense.title || !newExpense.amount) return;

  if (newExpense.id) {
    // Update existing expense
    setExpense(prevExpense =>
      prevExpense.map(item =>
        item.id === newExpense.id
          ? { ...newExpense, amount: Number(newExpense.amount) }
          : item
      )
    );
  } else {
    // Add new expense
    setExpense(prevExpense => [
      ...prevExpense,
      {
        ...newExpense,
        id: Date.now(),
        amount: Number(newExpense.amount)
      }
    ]);
  }

  // Reset form
  setNewExpense({
    id: "",
    title: "",
    amount: "",
    category: "",
    date: ""
  });
};


  

 
  let remainingBalance = earning-totalExpenses;

  const toggleDarkMode = ()=> {
    setDarkMode(prevDarkMode=>!prevDarkMode);
  }

  // edit expense 

  const editExpense=(item)=>{
    setNewExpense({
      id:item.id,
      title:item.title,
      amount:item.amount,
      category:item.category,
      date:item.date
    });
  };

   let filteredExpenses = expense.filter((item)=>
  {
    let matchesSearch = item.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

    let matchesCategory = 
    selectedCategory === "all" || 
    item.category.toLowerCase()===selectedCategory.toLowerCase();

    return matchesCategory&&matchesSearch;
  });
   

  let sortedExpenses = [...filteredExpenses].sort((a,b)=>{
    if(sortOrder==="oldest"){
      return new Date(b.date)-new Date(a.date);
    }
    if(sortOrder==="newest"){
      return new Date(a.date)-new Date(b.date);
    }
    if(sortOrder==="highest"){
      return Number(b.amount)-Number(a.amount);
    }
    if(sortOrder==="lowest"){
      return Number(a.amount)-Number(b.amount);
    }
    return 0;
  });
  const confirmDelete = (id) =>{
  const deleteExpense=window.confirm(
    "Are you sure you want to delete?"
  );
  if(deleteExpense){
    setExpense(expense.filter((item) => item.id !== id));
  }
  }

  let expenses = sortedExpenses.map((item)=>(
    <ExpensesItem key={item.id} expense={item} deleteExpense={confirmDelete} editExpense={editExpense}/>
  ));

  const clearAllExpenses = () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete all expenses?"
  );

  if (confirmDelete) {
    setExpense([]);
  }
};

const resetForm = () =>{
  setNewExpense({title:"",amount:"",category:"",date:""});
}



let expenseCount=expense.length;

let highestExpense =  expense.length === 0? 0: expense.reduce((accumulator,currentItem)=>{
  if(accumulator.amount>currentItem.amount){
    return accumulator;
  }
  else{
    return currentItem
  }
},expense[0]);

let today = new Date().toISOString().split("T")[0];
let filteredToday= expense.filter((item)=>item.date===today)
let filteredTodayExpenses = filteredToday.reduce((accumulator,currentItem)=>{
  return accumulator+currentItem.amount;
},0);

let spendingPercentage = earning>0? (totalExpenses/earning)*100 : 0;

let number = spendingPercentage.toFixed(0);

  
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
        <h1 className="remaining-balance-amount">Rs.{[remainingBalance]}</h1>
        <p className="remaining-balance-desc">Your total earning</p>
      </div>
      <div className="total-earning">
        <h3 className="total-earning-label">Total Earning</h3>
        <h1 className="total-earning-amount">Rs.{[earning]}</h1>
        <p className="total-earning-desc">Your total earning</p>
      </div>
      <div className="highest-expense">
        <h3 className="highest-expense-label">Highest Expense</h3>
        <h1 className="highest-expense-amount">Rs.{highestExpense.amount}</h1>
        <p className="highest-expense-desc">Your highest expense</p>
      </div>
      <div className="today-highest-expense">
        <h3 className="today-highest-expense-label">Today's Highest Expense</h3>
        <h1 className="today-highest-expense-amount">Rs.{filteredTodayExpenses}</h1>
        <p className="today-highest-expense-desc">Your highest expenses today</p>
      </div>
      <div className="spending-percentage">
        <h3 className="spending-percentage-label">Spending Percentage</h3>
        <h1 className="spending-percentage-amount">{number} %</h1>
        <p className="spending-percentage-desc">Your spending percentage</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${spendingPercentage}%` }}>
            
          </div>
        </div>
        
      </div>
      <div className="add-earning">
        <input type="number" className="earning-input" placeholder="add earning" onChange={updateEarning} value={newEarning}/>
        <button className="add-earning-btn" onClick={addEarning}>Add</button>
      </div>
     
    </div>
    <section className="expense-analytics">
  <h2>Expense Analytics</h2>
  <div className="analytics-container">
    {categoryAnalytics}
  </div>
  </section>


    <main className="main-content">

      <section className="expense-list">
        <h2>Recent Expenses</h2>

        <p className="expense-count">{expenseCount===1? expenseCount + " Expense" :expenseCount + " Expenses"}</p>

        <button
          className="clear-expenses-btn"
          onClick={clearAllExpenses}
          disabled={expense.length === 0}
        >
  Clear All Expenses
</button>

        <select className="sort-filter" value={sortOrder} onChange={(event)=>
          setSortOrder(event.target.value)
        }>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </select>
        
        <input type="text" className="search-input" placeholder="Search expenses..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
          <select name="" className="category-filter" value={selectedCategory} onChange={(event)=>
            setSelectedCategory(event.target.value)}>

          <option value="all">All Categories</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="other">Other</option>

          </select>

           {filteredExpenses.length === 0?(
           <p className="no-expenses">no expenses found ..</p>
           ): expenses}
      </section>

      <section className="expense-form">
        <h2>Add New Expense</h2>

        <div className="inputs">
          <input type="text" placeholder="Title" onChange={updateSetNewTitle} value={newExpense.title} />
          <input type="number" placeholder="Amount" onChange={updateSetNewAmount}  value={newExpense.amount}/>
          <input type="text" placeholder="Category" onChange={updateSetNewCategory} value={newExpense.category}/>
          <input type="date" onChange={updateSetNewDate} value={newExpense.date}/>

          

          <button onClick={addExpense} className="add-expenses-btn">
            Add Expense
          </button>
          <button onClick={resetForm} className="reset-btn">
            Reset Form
          </button>

        </div>

      </section>

    </main>
  <div className="mode-btn-container">
    <button className="dark-mode-btn" onClick={toggleDarkMode}>{darkMode?"Light":"Dark"}</button>
  </div> 
  <section className="expense-analytics">
  <h2>Expense Analytics</h2>

  <div className="analytics-container">
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={100}
          paddingAngle={4}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</section>

  </div>
);
}

export default App;