import { useState } from "react";
import './App.css'
import { MdEdit, MdDelete } from 'react-icons/md'

function App() {
  const [book, setBook] = useState([]);

    // 도서 전체 조회
    const handleGetBooks =()=> {
    fetch('/api/books') 
      .then(response => response.json())
      .then(data => {
        setBook(data);
      })
    };
    // 도서 특정 조회
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

    // 도서 삭제
  const handleDelete =(id)=>{
    fetch(`/api/books/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if(response.ok) {
      setBook((restBook) => restBook.filter((item) => item.id !== id))
    }})
  }
 
    // 도서 추가
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookIsbn, setBookIsbn] = useState("");
    const [bookPublishedDate, setBookPublishedDate] = useState("");
    const handlePOST =()=> {
    fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // 2. "나 JSON 보낸다!"
      body: JSON.stringify({ title: bookTitle, author: bookAuthor, 
        isbn: bookIsbn, publishedDate: bookPublishedDate }) // 3. 보낼 내용
      })
    .then(res => res.json());
  }

      
  return (
  <div>
    <h1>서버 응답 결과</h1>
    <button onClick={handleGetBooks}>조회하기</button><br/>
    <form>
      <div>
          <input 
            type="text"
            placeholder="제목"
            id="title"
            value={bookTitle}
            onChange={(e)=>{setBookTitle(e.target.value)}}
            />
            <input 
            type="text"
            placeholder="저자"
            id="bookAuthor"
            value={bookAuthor}
            onChange={(e)=>{setBookAuthor(e.target.value)}}
            />
            <input 
            type="number"
            placeholder="isbn"
            id="bookIsbn"
            value={bookIsbn}
            onChange={(e)=>{setBookIsbn(e.target.value)}}
            />
            <input 
            type="date"
            placeholder="출판날짜"
            id="BookPublishedDate"
            value={bookPublishedDate}
            onChange={(e)=>{setBookPublishedDate(e.target.value)}}
            />
          <button onClick={handlePOST}>등록하기</button><br/>
      </div>
    </form>

    <form onSubmit={hanldeSubmit}>
      <div>
        <input 
          type="text"
          id="findId"
          value={findId}
          onChange={(e)=>{setFindId(e.target.value)}}
          placeholder="ID"/>
        <button>
            ID 조회하기
          </button>
      </div>
    </form>

    <div>
      {book.map((book) => (
        <li className='item' key={book.id}>
          <div className='info'>
            <span>ID: {book.id} </span>
            <span>제목: {book.title}</span>
            <span>저자: {book.author}</span>
            <span>isbn: {book.isbn}</span>
            <span>출판날짜: {book.publishedDate}</span>
          </div>
          <div>
            <button
              className='edit-btn'>
              <MdEdit />
            </button>
            <button
              className='delete-btn'
              onClick={()=>{handleDelete(book.id)}}>
              <MdDelete />
            </button>
          </div>
        </li>
      ))}
    </div>
  </div>
);
}
export default App;