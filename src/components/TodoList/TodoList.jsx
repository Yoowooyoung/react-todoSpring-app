import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.css';

// app컴포넌트에서 배열객체를 props받고 
// 이를 하나씩 TodoItem컴포넌트로 props내림
const TodoList = ({
  todos,
  deleteButton,
  completeButton,
}) => {
  return (
    <ul className="list">
      {/* filter: return값이 true, false */}
      {/* map: 새로운 형태로 변환  */}
      {todos.map((todo) => {
        return (
          <TodoItem
              todo={todo}
              key={todo.id}
              deleteButton={deleteButton}
              completeButton={completeButton}
         />
        )
      })}

    </ul>
  )
}

export default TodoList



const persons =(name)=>{
  const newPersons = persons.map((person)=>
  person.name === name)
  setPerson(newPersons)
}