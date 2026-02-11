import { useState } from "react"
import "./App.css"
import TodoForm from "./components/TodoForm/TodoForm"
import TodoList from './components/TodoList/TodoList'

const App = () => {
  
  // 할일 이름, 할일 이름 저장
  const [todoName, setTodoName] = useState("")

  // 기존에 있던 할일들, 새로운 할일
  // useState: 배열을 return해주는 함수
  const [todos, setTodos] = useState([   // todos를 바꾸는 setTodos함수
    // 1번_todo 객체
    {id: 1, todoName: "8시 기상", comBtn: false}, // 기존 존해하는 할일, 완료/미완료 여부
    // 2번_todo 객체
    {id: 2, todoName: "10시 외출하기", comBtn: false},
  ])
  
  // 현재 입력값을 state에 저장함
  const writeTodoName =(e)=> {  // event
    // 콘솔창에 입력된 내용 출력
    console.log(e.target.value)
    // 출력된 내용 setTodoName에 저장
    setTodoName(e.target.value)
  }
  // 할일 제출 함수
  const handleSubmit =(e)=> {   // e는 매개변수
    e.preventDefault()
    if(todoName !== "") {// Todo 이름이 비어있다면 수정, 아니면 새로운 Todo배열객체 생성
      {
        const newTodo = {
          id: crypto.randomUUID(),
          todoName: todoName,
          comBtn: false,
        }
      const newTodos = [...todos, newTodo]  // 기존의 expenses에 newExpense 추가 -> newExpenses객체 생성,   
      // ...-> 기존의 todos에 있던 내용들 저장해놓기 위해서
      setTodos(newTodos)  // 마지막으로 생성된 Todos를 setTOdos에 저장
      console.log(newTodo)
      }
    }
    setTodoName("")
  }

    // 할일 list 삭제 로직
    const deleteButton=(id)=> {
      const newTodos = todos.filter((todo) => 
        todo.id !== id
      )
      setTodos(newTodos)
    }

    // 완료/미완료 버튼 함수
    const completeButton=(id)=> {
      // map: 배열 메소드
      const newTodos = todos.map((todo) => 
        todo.id === id 
              ? { ...todo, comBtn: !todo.comBtn }
              : todo
          )
          // const clickedAfter = newTodos.filter(todo => todo.id === id)[0]
          //console.log(clickedAfter.comBtn ? "완료입니다" : "미완료입니다")
            setTodos(newTodos)
     }

    // 다른 컴포넌트에 값 반환
  return (
    <main className="main-container">
      <h1>할 일 기록하기</h1>
        <div style={{ width: '100%', backgroundColor: 'white', padding: '2rem'}}>
          <TodoForm   // TodoForm컴포넌트로 props전달
            writeTodoName={writeTodoName}
            handleSubmit={handleSubmit}
            todoName={todoName}
          />
        </div>
        <div style={{ width: '100%', backgroundColor: 'white', padding: '2rem'}}>
          <TodoList 
            todos={todos}
             // editButton={editButton}
             deleteButton={deleteButton}
             completeButton={completeButton}
          />
        </div>
    </main>
  )
}


export default App
