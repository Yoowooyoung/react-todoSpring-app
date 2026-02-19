import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css';

const TodoList = ({
  todoAry,
  handleGET,  // 도서 전체 조회
  handleGetId,  // id 조회
  getId,
  onChangeId,
  handleDelete,   // 삭제
  putComplete,    // 수정
}) => {

  return (
    <React.Fragment>
      <div>
        <button
          className='btn'
          onClick={handleGET}
        >
          전체 조회
        </button>
        <br/>
      </div>
      <div>
        <input 
          type="number"
          placeholder="조회 Id"
          className='form-input'
          id="GetId"
          value={getId}
          onChange={onChangeId}
        />
        <button
          className='btn'
          onClick={handleGetId}
        >
        ID 조회
        </button>
      </div>
      <ul className="list">
        {todoAry.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              
              key={todo.id}
              handleDelete={handleDelete}
              putComplete={putComplete}
            />
          )
        })}
      </ul>
    </React.Fragment>
  )
}

export default TodoList