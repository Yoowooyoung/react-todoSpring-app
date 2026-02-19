import React from 'react'
import './TodoItem.css'

const TodoItem = ({
  todo,
  handleDelete,
  putComplete,
}) => {

  return (
    <li className='item'>
      <div className='info'>
        <span>
          id: {todo.id}
        </span>
        <span>
          할 일: {todo.content}
        </span>
        <span>
          생성 날짜: {todo.createdAt}
        </span>
      </div>
      <div>
        완료 여부
        &nbsp;
        <input
          type='checkbox'
          name='completeBtn'
          checked={todo.completed}
          onChange={() => putComplete(todo.id, todo.completed)}
        />
      </div>
      <div>
        <button
          className='delete-btn'
          onClick={() => handleDelete(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  )
}

export default TodoItem