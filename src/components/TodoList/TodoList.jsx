import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css';

const TodoList = ({
  todos,
  handleGET,
  handleGetId,
  getId,
  onChangeId,
  handleDelete,
  putComplete,
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
        {todos.map((todo) => {
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