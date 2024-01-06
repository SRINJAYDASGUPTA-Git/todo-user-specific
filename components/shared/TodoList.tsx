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
    setTodos: any
    user_id: string
}
const TodoList = ({ todos, setTodos, user_id }: TodoListParams) => {
    const { session } = useSession();
    const [loading, setLoading] = useState(true);

    // on first load, fetch and set todos
    useEffect(() => {
        const loadTodos = async () => {
            try {
                setLoading(true);
                const supabaseAccessToken = await session?.getToken({
                    template: "supabase",
                });
                const supabase = await supabaseClient(supabaseAccessToken || "");
                const { data: todos } = await supabase.from("todos").select("*").eq("user_id", user_id);
                setTodos(todos);
            } catch (e) {
                alert(e);
            } finally {
                setLoading(false);
            }
        };
        loadTodos();
    }, []);

    // if loading, just show basic message
    if (loading) {
        return <div className='py-[1rem] px-[2rem] flex flex-col items-center'>Loading...</div>;
    }

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