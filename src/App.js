
import { useEffect, useState } from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo';
import { QuerySnapshot, addDoc, collection, deleteDoc, doc, documentId, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
const style ={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0] `,
  countainer:`bg-slate-100 max-w-[500px] m-auto rounded-md drop-shadow-xl p-4`,
  heading:'text-3xl font-bold text-center text-gray-800 p-2',
  form:`flex justify-between`,
  input:`border p-2  w-full text-xl`,
  button:`border p-4 ml-2 bg-purple-500 text-slate-100`,
  count:`text-center p-2`


}

function App() {
  const [todo,setTodo]=useState([]);
  const [count,setCount]=useState(0);
  const [input,setInput]=useState("")

  //create todo

const create =async (e) =>{
  e.preventDefault(e)
  if(input===""){
    alert('please enter something')
    return
  }
  //create a db if not there 
  await addDoc(collection(db,'todos'),{
    text:input,
    completed:false
  })
  setInput('')
}

  //read 
  useEffect(() => {
    const q =query(collection(db,'todos'))
    const unsubscribe =onSnapshot(q,(querySnapshot)=>{
      let todoarr=[]
      querySnapshot.forEach((doc)=>{
        todoarr.push({...doc.data(),id:doc.id})
      });
      setTodo(todoarr)
    })
    return()=>unsubscribe()
  
  }, [])
  
  //update
  const toggleCompleted = async(todo)=> {
  await updateDoc(doc(db,'todos',todo.id),{
   completed:!todo.completed
  })
  }
  //delete

  const deletetodo = async(id)=>{
   await deleteDoc(doc(db,'todos',id),{

   })
  }

  return (
    <div className={style.bg}>
     <div className={style.countainer}>
   <h3 className={style.heading}>Todo app</h3>
   <form onSubmit={create} className={style.form}>
    <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type="text" placeholder="add Todo"/>
    <button className={style.button}>
      <AiOutlinePlus size={30}/>
      </button>
   </form>
   <ul>
   
   {todo.map((todo,index)=>(
     <Todo key={index} todo={todo} togglecompleted={toggleCompleted} deletetodo={deletetodo} />
   ))}


   </ul>
   <p className={style.count}>you have {todo.length} todos </p>
     </div>
    </div>
  );
}

export default App;
