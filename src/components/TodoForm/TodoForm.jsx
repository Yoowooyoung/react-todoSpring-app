import React from 'react'
import './TodoForm.css'

const TodoForm = ({
    writeTodoName,
    handleSubmit,
    todoName,
}) => {
  return (
    <form /*onChange={handleSubmit}*/>
        <div className='form-center'>
            <div className='form-group'>
                <input      // 타이핑한 내용이 입력칸에 보이게 함
                    type="text" // 타입: Text
                    onChange={writeTodoName}
                    className='form-control'
                    placeholder="예) 출근"  // 예시 TodoName
                    valeu={todoName}  // 제어 컴포넌트 -> app.js에서 setTodoName("") 이 작동함
                     />       {/*입력 감지*/}
            </div>
        </div>
        <button 
            onClick={handleSubmit}
            className='btn' 
            type='submit'
        >
            제출
        </button>
    </form>
  )
}

export default TodoForm