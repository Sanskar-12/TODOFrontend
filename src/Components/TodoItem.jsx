
const TodoItem = ({title,description,UpdateHandler,DeleteHandler,id}) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input type="checkbox" onChange={()=>UpdateHandler(id)}/>
        <button className="btn" onClick={()=>DeleteHandler(id)}>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem
