import './App.css'
import React, { useState } from 'react'
import ExpenseForm from './components/TodoForm/TodoForm';
import ExpenseList from "./components/TodoList/TodoList";

function App() {

  const [bookAry, setBookAry] = useState([]);
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
    
    // 도서 추가
    const handleContent =(e)=> {  // 내용 입력
      setContent(e.target.value)
    }
    const handleCreatedAt =(e)=> {  // 날짜 입력
      setCreatedAt(e.target.value)
    }
    const handlePOST =(e)=> {
      e.preventDefault();

        if(content !== "" && createdAt !== "") {  // 빈값 차단
          fetch('/api/books', {   // fetch
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // 2. "나 JSON 보낸다!"
            body: JSON.stringify({ content: content, completed: false, createdAt: createdAt }) // 3. 보낼 내용
          })
          .then(res => res.json())
          .then(data => {
            const everyAry = [...bookAry, data]
            setBookAry(everyAry)
            setContent("")
            setCreatedAt("")
          })
        } else {
          alert("빈 내용입니다.")
        }
      }

    const handleGET =(e)=> {    // 도서 전체 조회
      e.preventDefault();
      fetch('/api/books')
        .then(response => response.json())
        .then(data => {
          setBookAry(data)
          console.log(data)
        })
    }
  
    const [getId, setGetId] = useState("");   // 도서 Id 조회
    const onChangeId =(e) => {
      setGetId(e.target.value)
    }
    const handleGetId =()=> {
      const findId = Number(getId);
      fetch(`/api/books/${findId}`)
        .then(response => response.json())
        .then(data => {
          setBookAry([data])
          setGetId("")
        })
    }

    const putComplete =(id, completed)=> {    // 완료 여부

      const completedId = Number(id);
      const targetBook = bookAry.find(book => book.id === completedId);

      fetch(`/api/books/${completedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }, // 2. "나 JSON 보낸다!"
        body: JSON.stringify({content: targetBook.content, completed: !completed, 
          createdAt: targetBook.createdAt
        })
      }) 
      .then(response => response.json())
      .then((data) => {
        const afterBookAry = bookAry.map((book) => {
          if (book.id === completedId) {
            return data; 
          } else {
            return book;
          }
        });
        console.log(afterBookAry)
        setBookAry(afterBookAry)
      })
    }
  
    const handleDelete=(id)=> {   // 할일 삭제
      const deleteId = Number(id)
      fetch(`/api/books/${deleteId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if(response.ok) {
          setBookAry((eleBook) => eleBook.filter((item) => item.id !== id))
        }
      })
    }

  return (
    <main className="main-container">   
      <h1> 예산 계산기</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
        <ExpenseForm 
          handlePOST={handlePOST}
          content={content}
          createdAt={createdAt}
          handleContent={handleContent}
          handleCreatedAt={handleCreatedAt}
        />
        <ExpenseList 
          bookAry={bookAry}
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
