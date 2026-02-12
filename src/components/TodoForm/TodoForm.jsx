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
            placeholder="내용"
            className='form-control'
            id="content"
            value={content}
            onChange={handleContent}
            />
        </div>
        <div className='form-group'>
          <label htmlFor='createdAt'>생성날짜</label>
          <input 
            type="date"
            placeholder="출판날짜"
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