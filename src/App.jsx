import './App.css'
import React, { useEffect, useState } from 'react'
import ExpenseForm from './components/TodoForm/TodoForm';
import ExpenseList from "./components/TodoList/TodoList";
import axios from 'axios';

function App() {

  const [todos, setTodos] = useState([]);
  const [FullTodos, setFullTodos] = useState([]);   // 항상 전체 요소
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {   // 처음 사이트로 들어왔을 때
    axios.get("http://localhost:8080/api/todos")
      // .then(response => response.json())
      .then(response => {
        // console.log("전체 할 일", response);
        setTodos(response.data);
        setFullTodos(response.data);
      })
  }, []);   // 처음 사이트 방문 시 빈배열이므로 실행

    // useEffect(() => {
    //   fetch("http://localhost:8080/api/todos")
    //   .then(response => {
    //     console.log("raw response", response)
    //     return response.json()}
    //     )
    //   .then(data => {
    //     // console.log("전체 할 일", data);
    //   setTodos(data)
    //   setAlwaysTodoAry(data)
    //   })
    // }, []);

    // 도서 추가
    const handleContent = (e) => {  // 내용 입력
      setContent(e.target.value)
    }
    const handleCreatedAt = (e) => {  // 날짜 입력
      setCreatedAt(e.target.value)
    }
    const handlePOST = (e) => {   // 할 일 추가
      e.preventDefault();
        if(content !== "" && createdAt !== "") {
          axios.post("http://localhost:8080/api/todos", {
            content: content,
            completed: false,
            createdAt: createdAt,
            // method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // "나 JSON 보낸다"
            // body: JSON.stringify({ content: content, completed: false, createdAt: createdAt }) // 3. 보낼 내용
          })
          // .then(response => response.json())
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

    const handleGET = (e) => {    // 도서 전체 조회
      e.preventDefault();
      if(FullTodos.length !== 0) {    // true: FullTodos에 요소가 0개가 아닌 경우
      axios.get("http://localhost:8080/api/todos")
        // .then(response => response.json())
        .then(response => {
          console.log("전체 조회_response.data", response.data)
          setTodos(response.data)
          setFullTodos(response.data)
        })
      } else {    // false: FullTodos에 요소가 0개인 경우
        alert("할 일이 없습니다.")
      }
    }

    const [getId, setGetId] = useState("");   // 할 일 Id 조회
    const onChangeId = (e) => {
      setGetId(e.target.value)
    }
    const handleGetId =()=> {
      const findId = Number(getId);
      if(FullTodos.find((todo) => String(todo.id) === (getId))) {   // 숫자로 변환해줘야 숫자간 비교 가능
        console.log("getId 타입", typeof(getId))
        axios.get(`http://localhost:8080/api/todos/${findId}`)
        // .then(response => respnse.JSON())
        .then(response => {
          // console.log("response", response)
          // console.log("id 조회 데이터", response.data)
          setTodos([response.data])
          setGetId("")
        })
      } else {
        alert("id가 " + getId + "인 할 일은 없습니다.")
        console.log("getId 타입", typeof(getId))
        console.log("getId", getId)
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
        // method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, // "나 JSON 보낸다"
        // body: JSON.stringify({content: findTodo.content, completed: !completed,    // Fetch
        //   createdAt: findTodo.createdAt
        // })
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
      .then(response => 
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

    // const handleDelete=(id)=> {   // 할 일 삭제
    //   const deleteId = Number(id)
    //   fetch(`http://localhost:8080/api/todos/${deleteId}`, {
    //     method: 'DELETE'
    //   })
    //   .then(response => {
    //     if(response.ok) {
    //       setTodoAry((todo) => todo.filter((item) => item.id !== id))
    //     }
    //   })
    // }

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
