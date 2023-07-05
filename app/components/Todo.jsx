import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
const style = {
  li: `flex justify-between bg-gradient-to-r from-stone-300/60 to-stone-200/60 p-4 my-2 capitalize rounded-xl shadow-lg hover:scale-[1.025] ease-in duration-300`,
  liComplete: `flex justify-between bg-gradient-to-r from-stone-600/50 to-stone-400/50 p-4 my-2 capitalize rounded-xl shadow-lg hover:scale-[1.025] ease-in duration-300`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className={style.button}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todo;
