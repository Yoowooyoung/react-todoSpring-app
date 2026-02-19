import './TodoForm.css'

const TodoForm = ({
    handlePOST,
    content,
    createdAt,
    handleContent,
    handleCreatedAt,

}) => {

  return (
    <form onSubmit={handlePOST}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='content'>내용</label>
          <input 
            type="text"
            placeholder="ex.식사"
            className='form-control'
            id="content"
            value={content}
            onChange={handleContent}
            />
        </div>
        <div className='form-group'>
          <label htmlFor='createdAt'>날짜</label>
          <input 
            type="date"
            className='form-control'
            id="createdAt"
            value={createdAt}
            onChange={handleCreatedAt}
          />
        </div>
      </div>
      <div>
        <button 
          className='btn'>
          등록하기
        </button><br/>
      </div>
    </form>
  )
}

export default TodoForm