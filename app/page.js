"use client";
import Image from "next/image";
import { UserAuth } from "./context/AuthContext";
import { Inter } from "next/font/google";
import { AiOutlinePlus } from "react-icons/ai";

import { useState, useEffect } from "react";
import Todo from "@/app/components/Todo";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  //Create Todo
  
  const createTodo = async (e) => {

    e.preventDefault(e);
    if (input === "") {
      alert("Please Enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  //Read Todo from Firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      let todoarr = [];
      querySnapshot.forEach((doc) => {
        todoarr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoarr);
    });
    return () => unSub;
  }, []);
  //Update todo in Firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  //Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <main className="h-screen w-full p-4 m-auto bg-gradient-to-r from-[#2F80ED] to-[#1Cb5e0]">
      <div className="bg-gradient-to-b from-stone-400/70  backdrop-blur to-stone-300/60 max-w-[500px] w-full  mt-40 m-auto rounded-xl shadow-xl p-6">
        <h3 className="text-3xl font-bold text-center text-gray-800 p-2">
          Todo App
        </h3>
        <form onSubmit={createTodo} className="flex justify-between">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 w-full text-xl shadow-lg shadow-gray-400 backdrop-blur rounded-xl bg-gray-300/70 text-gray-600 outline-none text-center hover:scale-[1.02] ease-in duration-300"
            type="text"
            placeholder="Add Todo"
          />
          <button className=" p-4 ml-2 sm:mt-0 bg-gradient-to-b from-purple-500 to-purple-400  rounded-xl shadow-lg shadow-gray-400 hover:scale-105 ease-in duration-300">
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className="text-center p-2">{`You have ${todos.length} Todos`}</p>
        )}
      </div>
    </main>
  );
}
