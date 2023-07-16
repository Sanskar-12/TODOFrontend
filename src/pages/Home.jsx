import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../Components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {isAuthenticated}=useContext(Context)


  const UpdateHandler=async(id)=>{
    try {
      const {data}=await axios.put(`${server}/tasks/${id}`,{},{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  
  const DeleteHandler=async(id)=>{
    try {
      const {data}=await axios.delete(`${server}/tasks/${id}`,{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const submitHandler =async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const {data}=await axios.post(`${server}/tasks/new`,{
        title,description
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      setTitle("")
      setDesc("")
      toast.success(data.message)
      setLoading(false)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }

  };

  useEffect(()=>{
    axios.get(`${server}/tasks/my`,{
      withCredentials:true
    }).then((res)=>{
      setTask(res.data.tasks)
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  },[refresh])

  if(!isAuthenticated)
  {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <button type="submit" disabled={loading}> Add</button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {
          tasks.map((i)=>(
            <TodoItem key={i._id} title={i.title} description={i.description} UpdateHandler={UpdateHandler} DeleteHandler={DeleteHandler} id={i._id}/>
          ))
        }
      </section>
    </div>
  );
};

export default Home;
