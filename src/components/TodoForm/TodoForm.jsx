import React from 'react'
import './TodoForm.css'

const TodoForm = ({
    handleSubmit,

    
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
  )
}

export default TodoForm