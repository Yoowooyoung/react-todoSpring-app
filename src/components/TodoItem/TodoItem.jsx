import React from 'react'
import './TodoItem.css'

const TodoItem = ({
  todo,
  // EditButton,
  deleteButton,
  completeButton,
}
) => {
  return (
    <li className='item'>
      <div className='list'>
        <span>
          {todo.todoName}
        </span>
      </div>
      <div className='btn-group'>
          <input
            type='checkbox'
            checked={todo.comBtn}   // 제어 컴포넌트 
            onChange={() => completeButton(todo.id)}  // onChange: event handling, 값의 변화-> onChange사용
          />
          완료 여부
        {/* <button */}
          {/* className={todo.comBtn ? "complete-btn_comBtn" : "complete-btn"} */}
          {/* onClick={() => completeButton(todo.id)} */}
          {/* // 완료/미완료 버튼 클릭 시 */}
          {/* // completeButton함수에 todo.id 반환 */}
        {/* > */}
           {/* {todo.comBtn ? "완료" : "미완료"} */}
            {/*todo.comBtn이 true면 완료 버튼, false면 미완료 버튼*/}
        {/* </button> */}
        <button
          className='delete-btn'
          onClick={() => deleteButton(todo.id)}
          // ()=>: 익명함수, 익명함수 내부에서 deleteButton(todo.id)함수를 실행, 
          // deleteButton함수를 호출함
          // deleteButton함수를 onClick에 걸어둠
          // app.js의 deleteButton함수에 todo.id 전달
        >
          삭제
        </button>
      </div>
    </li>
  )
}

export default TodoItem