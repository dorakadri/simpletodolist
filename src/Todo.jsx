import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const style={
    li:`flex justify-between bg-slate-200 my-2 p-4 capitalize`  ,
    todo:`ml-2 cursor-pointer`,
    todocomplete:`ml-2 cursor-pointer line-through`,
    row:`flex`,
    button:`cursor-pointer flex items-center`,
    licompleted:`flex justify-between bg-slate-400 my-2 p-4 capitalize`  ,
    
}
export default function Todo({todo,togglecompleted,deletetodo}) {
  return (
    <li className={todo.completed ? style.licompleted : style.li}>
        <div className={style.row} >
        <input onChange={()=>togglecompleted(todo)} type="checkbox" checked={todo.completed} />
        <p onClick={()=>togglecompleted(todo)} className={todo.completed ? style.todocomplete : style.todo}>{todo.text}</p>
        </div>
        <button onClick={()=>deletetodo(todo.id)}><FaRegTrashAlt/></button>
    </li>
  )
}
