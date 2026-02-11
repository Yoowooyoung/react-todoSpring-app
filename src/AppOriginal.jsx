import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert"
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from "./components/ExpenseList";


const App = () => {

    const [charge, setCharge] = useState("");
    const [id, setId] = useState('');
    const [amount, setAmount] = useState(0);
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState({show: false});
    const [book, setBook] = useState([])

    // 특정 도서 조회
    const [findId, setFindId] = useState("")
    const hanldeSubmit =(e)=> {
      e.preventDefault();
      const getId = Number(findId)
      fetch(`/api/books/${getId}`)
      .then((response) => response.json())  // 요청을 받았는지 확인용
      .then((data) => {       // 실제 데이터
        setBook([data]);
        setFindId("")
      })
    };

    const handleAmount = (e) => {       // 지출 항목 입력시 내용 출력 
        // console.log( e.target.valueAsNumber);
        // console.log(typeof e.target.valueAsNumber)
        setAmount(e.target.valueAsNumber)
    }
    

    const handleDelete = (id) => {
        const newExpenses = /*this.state.*/expenses.filter(expense => 
            expense.id !== id)
        console.log(newExpenses);
        setExpenses(newExpenses);
        /*this.setState({expenses: newExpenses});*/         // 함수형 컴포넌트
        handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.'})
    }

    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
        setAlert({ show: false });
        }, 7000);
    }

    const handleEdit = id => {
        const expense = expenses.find(item => item.id === id);
        const { charge, amount } = expense;
        setId(id);
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(charge !== "" && amount > 0) {
            if (edit) {
            const newExpenses = expenses.map(item => {
                return item.id === id ? { ...item, charge, amount } : item
            })
                setExpenses(newExpenses);
                setEdit(false);
                handleAlert({ type: 'success', text: "아이템이 수정되었습니다." })
            } else {
                const newExpense = { id: crypto.randomUUID(), charge, amount }
                const newExpenses = [...expenses, newExpense];
                setExpenses(newExpenses);
                handleAlert({ type: "success", text: "아이템이 생성되었습니다" });
                }
                setCharge("");
                setAmount(0);
                } else {  
                console.log('error');
                handleAlert({
                    type: 'danger',
                    text: 'charge는 빈 값일수 없으며 amount는 0보다 커야 합니다.'
                })
            }
        }

    // render() {
        return (
            // 전체 컨테이너
                <main className="main-container">   
                    {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
                    <h1> 예산 계산기</h1>
                    
                <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
                    {/* Expense Form  */}
                    <ExpenseForm 
                        hanldeSubmit={hanldeSubmit}
                        charge={charge}
                        handleAmount={handleAmount}
                        amount={amount}
                        handleSubmit={handleSubmit}
                        edit={edit}
                    />
                </div >

                <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
                    {/* Expense List  */}
                    <ExpenseList 
                    expenses={expenses}
                    handleDelete={/*this.*/handleDelete} // 함수형 컴포넌트
                    // initialExpenses={this.state.expenses}
                    handleEdit={handleEdit}
                    clearItems={clearItems}
                    />
                </div>

                 <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                    <p style={{ fontSize: '2rem' }}>
                        총지출:
                        <span>
                        {expenses.reduce((acc, curr) => {       // 입력한 비용의 총합
                            return (acc += curr.amount);
                        }, 0)}
                            원              
                    </span>
                    </p>
                 </div>


                </main>
        )
}
export default App