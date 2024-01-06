"use client"
import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import supabaseClient from "@/lib/supabase"
export interface Todo {
    id: string
    title: string
}
interface TodoListParams {
    todos: Todo[]
}
const TodoList = ({ todos }: TodoListParams) => {
    // display all the todos
    return (
        <>
            {todos?.length > 0 ? (
                <div className='pl-[1rem] self-baseline'>
                    <ol>
                        {todos.map((todo) => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ol>
                </div>
            ) : (
                <div className='py-[1rem] px[2rem]'>You don't have any todos!</div>
            )}
        </>
    );
};
export default TodoList