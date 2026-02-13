import React from 'react'
import './TodoItem.css'

const TodoItem = ({
  book,
  handleDelete,   // 삭제
  // 완료 여부
  putComplete,    // 완료 여부
}) => {

  return (
    <li className='item'>
      <div className='info'>
        <span>
          id: {book.id}
        </span>
        <span>
          할 일: {book.content}
        </span>
        <span>
          생성 날짜: {book.createdAt}
        </span>
      </div>
      <div>
        완료 여부
        &nbsp;
        <input
          type='checkbox'
          name='completeBtn'
          checked={book.completed}
          onChange={() => putComplete(book.id, book.completed)}
        />
      </div>
      <div>
        <button
          className='delete-btn'
          onClick={() => handleDelete(book.id)}
        >
          삭제
        </button>
      </div>
    </li>
  )
}

export default TodoItem