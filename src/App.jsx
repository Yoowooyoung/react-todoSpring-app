import './App.css'
import React, { useEffect, useState } from 'react'
import ExpenseForm from './components/TodoForm/TodoForm';
import ExpenseList from "./components/TodoList/TodoList";
import axios from 'axios';

function App() {

  const [todos, setTodos] = useState([]);
  const [FullTodos, setFullTodos] = useState([]);   // 항상 전체 배열
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {   // 처음 사이트로 들어왔을 때,새로고침
    axios.get("http://localhost:8080/api/todos")
      .then(response => {
        setTodos(response.data);
        setFullTodos(response.data);
      })
  }, []);

    const handleContent = (e) => {  // 내용 입력
      setContent(e.target.value)
    }
    const handleCreatedAt = (e) => {  // 날짜 입력
      setCreatedAt(e.target.value)
    }
    const handlePOST = (e) => {   // 할 일 추가
      e.preventDefault();
        if(content !== "" && createdAt !== "") {
          axios.post("http://localhost:8080/api/todos", {   // axios
            content: content,
            completed: false,
            createdAt: createdAt,
            // method: 'POST',    // fetch
            // headers: { 'Content-Type': 'application/json' }, // 부가 정보
            // body: JSON.stringify({ content: content, completed: false, createdAt: createdAt })   // 보낼 내용
          })
          // .then(response => response.json())   // fetch
            .then(response => {
              const postTodos = [...todos, response.data]   // 추가한 todo 바로 화면에 보이게
              setTodos(postTodos)
              setFullTodos(postTodos)
              setContent("")
              setCreatedAt("")
            })
        } else {
          alert("빈 내용입니다.")
        }
      }

    const handleGET = (e) => {    // 할 일 전체 조회
      e.preventDefault();
      if(FullTodos.length !== 0) {
      axios.get("http://localhost:8080/api/todos")
        .then(response => {
          console.log("전체 조회_response.data", response.data)
          setTodos(response.data)
          setFullTodos(response.data)
        })
      } else {
        alert("할 일이 없습니다.")
      }
    }

    const [getId, setGetId] = useState("");   // 할 일 Id 조회
    const onChangeId = (e) => {
      setGetId(e.target.value)
    }
    const handleGetId =()=> {
      const findId = Number(getId);
      if(FullTodos.find((todo) => String(todo.id) === (getId))) {   // 타입 통일
        axios.get(`http://localhost:8080/api/todos/${findId}`)
        .then(response => {
          setTodos([response.data])
          setGetId("")
        })
      } else {
        alert("id가 " + getId + "인 할 일은 없습니다.")
        setGetId("")
      }
    }

    const putComplete = (id, completed) => {    // 완료 여부(checkbox)
      const completedId = Number(id);
      const findTodo = todos.find((todo) => todo.id === completedId);
      axios.put(`http://localhost:8080/api/todos/${completedId}`, {
        content: findTodo.content,    // 내용과 날짜는 그대로 완료여부만 반대로
        completed: !completed,
        createdAt: findTodo.createdAt,
      }) 
      .then((response) => {
        const afterTodoAry = todos.map((todo) => {
          // console.log("put_todo", todo)
          if (todo.id === completedId) {
            return response.data; 
          } else {
            return todo;
          }
        });
        setTodos(afterTodoAry)
      })
    }
  
    const handleDelete=(id)=> {   // 할 일 삭제
      const deleteId = Number(id)
      axios.delete(`http://localhost:8080/api/todos/${deleteId}`, {
      })
      .then((response) => 
          // setTodoAry((todoAry) => todoAry.filter((item) => item.id !== deleteId))
        {
          alert(response.data.content + "를 삭제하였습니다.")
          const afterTodoArray = todos.filter(todo => {
            if(todo.id !== response.data.id) {
              return todo
            }
          })
          setTodos(afterTodoArray)
        }
      )
    }

  return (
    <main className="main-container">   
      <h1>플래너</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
        <ExpenseForm 
          handlePOST={handlePOST}
          content={content}
          createdAt={createdAt}
          handleContent={handleContent}
          handleCreatedAt={handleCreatedAt}
        />
        <ExpenseList 
          todos={todos}
          handleGET={handleGET}
          // id 조회
          handleGetId={handleGetId}
          getId={getId}
          // 제출 버튼
          onChangeId={onChangeId}
          // 삭제
          handleDelete={handleDelete}
          // 완료 여부
          putComplete={putComplete}
        />
      </div >
    </main>
  )
}

export default App;
