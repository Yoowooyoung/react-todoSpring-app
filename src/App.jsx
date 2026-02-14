// import './App.css'
// import React, { useState } from 'react'
// import ExpenseForm from './components/TodoForm/TodoForm';
// import ExpenseList from "./components/TodoList/TodoList";

// function App() {

//   const [bookAry, setBookAry] = useState([]);
//   const [bookAryTotal, setBookAryTotal] = useState([]);   // 전체 요소
//   const [content, setContent] = useState("");
//   const [createdAt, setCreatedAt] = useState("");

//     // 처음 사이트로 들어왔을 때
//     fetch('/api/todos')
//       .then(response => response.json())
//       .then(data => {
//       setBookAry(data)
//       setBookAryTotal(data)
//       })

//     // 도서 추가
//     const handleContent =(e)=> {  // 내용 입력
//       setContent(e.target.value)
//     }
//     const handleCreatedAt =(e)=> {  // 날짜 입력
//       setCreatedAt(e.target.value)
//     }
//     const handlePOST =(e)=> {   // 할 일 추가
//       e.preventDefault();
//         if(content !== "" && createdAt !== "") {
//           fetch('/api/todos', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' }, // 2. "나 JSON 보낸다"
//             body: JSON.stringify({ content: content, completed: false, createdAt: createdAt }) // 3. 보낼 내용
//           })
//           .then(res => res.json())
//           .then(data => {
//             const everyAry = [...bookAry, data]   // 추가한 todo 바로 화면에 보이게
//             setBookAry(everyAry)
//             setBookAryTotal(everyAry)
//             setContent("")
//             setCreatedAt("")
//           })
//         } else {
//           alert("빈 내용입니다.")
//         }
//       }

//     const handleGET =(e)=> {    // 도서 전체 조회
//       e.preventDefault();
//       if(bookAry.length !== 0) {
//       fetch('/api/todos')
//         .then(response => response.json())
//         .then(data => {
//           setBookAry(data)
//           setBookAryCopy(data)
//         })
//         alert("할 일이 존재합니다.")
//       } else {
//         alert("할 일이 없습니다.")
//       }
//     }

//     const [getId, setGetId] = useState("");   // 도서 Id 조회
//     const onChangeId =(e) => {
//       setGetId(e.target.value)
//       console.log("bookAry내용", bookAry)
//     }
//     const handleGetId =()=> {
//       const findId = Number(getId);
//       if(bookAryCopy.find((book) => Number(book.id) === Number(getId))) {   // 숫자로 변환해줘야 숫자간 비교 가능
//       fetch(`/api/todos/${findId}`)
//         .then(response => response.json())
//         .then(data => {
//           setBookAry([data])
//           setGetId("")
//         })
//       } else {
//         alert("id가 " + getId + "인 할 일은 없습니다.")
//         setGetId("")
//       }
//     }

//     const putComplete =(id, completed)=> {    // 완료 여부(checkbox)

//       const completedId = Number(id);
//       const targetBook = bookAry.find((book) => book.id === completedId);

//       fetch(`/api/todos/${completedId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' }, // 2. "나 JSON 보낸다"
//         body: JSON.stringify({content: targetBook.content, completed: !completed, 
//           createdAt: targetBook.createdAt
//         })
//       }) 
//       .then(response => response.json())
//       .then((data) => {
//         const afterBookAry = bookAry.map((book) => {
//           if (book.id === completedId) {
//             return data; 
//           } else {
//             return book;
//           }
//         });
//         console.log(afterBookAry)
//         setBookAry(afterBookAry)
//       })
//     }
  
//     const handleDelete=(id)=> {   // 할 일 삭제
//       const deleteId = Number(id)
//       fetch(`/api/todos/${deleteId}`, {
//         method: 'DELETE'
//       })
//       .then(response => {
//         if(response.ok) {
//           setBookAry((eleBook) => eleBook.filter((item) => item.id !== id))
//         }
//       })
//     }

//   return (
//     <main className="main-container">   
//       <h1>플래너</h1>
//       <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
//         <ExpenseForm 
//           handlePOST={handlePOST}
//           content={content}
//           createdAt={createdAt}
//           handleContent={handleContent}
//           handleCreatedAt={handleCreatedAt}
//         />
//         <ExpenseList 
//           bookAry={bookAry}
//           handleGET={handleGET}
//           // id 조회
//           handleGetId={handleGetId}
//           getId={getId}
//           // 제출 버튼
//           onChangeId={onChangeId}
//           // 삭제
//           handleDelete={handleDelete}
//           // 완료 여부
//           putComplete={putComplete}
//         />
//       </div >
//     </main>
//   )
// }

// export default App;

import './App.css'
import React, { useState, useEffect } from 'react' // useEffect 추가
import ExpenseForm from './components/TodoForm/TodoForm';
import ExpenseList from "./components/TodoList/TodoList";

function App() {
  const [bookAry, setBookAry] = useState([]);
  const [bookAryTotal, setBookAryTotal] = useState([]); 
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [getId, setGetId] = useState("");

  // API 서버 주소 상수로 관리
  const API_BASE_URL = "http://localhost:8080/api/todos";

  // 처음 사이트로 들어왔을 때 (useEffect를 사용해야 무한 루프가 발생하지 않음)
  useEffect(() => {
    fetch(API_BASE_URL)
      .then(response => response.json())
      .then(data => {
        setBookAry(data);
        setBookAryTotal(data);
      })
      .catch(err => console.error("데이터 로딩 실패:", err));
  }, []);

  // 도서 추가
  const handleContent = (e) => setContent(e.target.value);
  const handleCreatedAt = (e) => setCreatedAt(e.target.value);

  const handlePOST = (e) => {
    e.preventDefault();
    if (content !== "" && createdAt !== "") {
      fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content, completed: false, createdAt: createdAt })
      })
      .then(res => res.json())
      .then(data => {
        const everyAry = [...bookAry, data];
        setBookAry(everyAry);
        setBookAryTotal(everyAry);
        setContent("");
        setCreatedAt("");
      });
    } else {
      alert("빈 내용입니다.");
    }
  };

  const handleGET = (e) => {
    e.preventDefault();
    fetch(API_BASE_URL)
      .then(response => response.json())
      .then(data => {
        setBookAry(data);
        setBookAryTotal(data);
        if (data.length > 0) alert("할 일이 존재합니다.");
        else alert("할 일이 없습니다.");
      });
  };

  const onChangeId = (e) => setGetId(e.target.value);

  const handleGetId = () => {
    const findId = Number(getId);
    // bookAryTotal에서 검색하도록 수정 (전체 데이터 기준)
    if (bookAryTotal.find((book) => Number(book.id) === findId)) {
      fetch(`${API_BASE_URL}/${findId}`)
        .then(response => response.json())
        .then(data => {
          setBookAry([data]);
          setGetId("");
        });
    } else {
      alert("id가 " + getId + "인 할 일은 없습니다.");
      setGetId("");
    }
  };

  const putComplete = (id, completed) => {
    const completedId = Number(id);
    const targetBook = bookAry.find((book) => book.id === completedId);

    fetch(`${API_BASE_URL}/${completedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: targetBook.content,
        completed: !completed,
        createdAt: targetBook.createdAt
      })
    })
    .then(response => response.json())
    .then((data) => {
      const afterBookAry = bookAry.map((book) => (book.id === completedId ? data : book));
      setBookAry(afterBookAry);
      setBookAryTotal(afterBookAry);
    });
  };

  const handleDelete = (id) => {
    const deleteId = Number(id);
    fetch(`${API_BASE_URL}/${deleteId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        const filtered = bookAry.filter((item) => item.id !== id);
        setBookAry(filtered);
        setBookAryTotal(filtered);
      }
    });
  };

  return (
    <main className="main-container">
      <h1>플래너</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
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
          handleGetId={handleGetId}
          getId={getId}
          onChangeId={onChangeId}
          handleDelete={handleDelete}
          putComplete={putComplete}
        />
      </div>
    </main>
  );
}

export default App;