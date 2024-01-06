import supabaseClient from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "../ui/button";
interface Todo {
    id: string
    title: string
}
interface TodoListParams {
    todos: Todo[]
    setTodos: any
}
export default function AddTodoForm({ todos, setTodos }: TodoListParams) {
    const { getToken, userId } = useAuth();
    const [newTodo, setNewTodo] = useState("");
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (newTodo === "") {
            return;
        }

        const supabaseAccessToken = await getToken({
            template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken || "");
        const { data } = await supabase
            .from("todos")
            .insert({ title: newTodo, user_id: userId })
            .select()

        if (data) {
            setTodos([...todos, data[0]]);
        }
        setNewTodo("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex-center">
            <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} className="border-gray-400 border-2 rounded-lg p-1" placeholder="Add new Todo" />
            &nbsp; <Button className="rounded-full bg-purple-500 hover:bg-purple-600 " size='lg'>
                Add Todo
            </Button>
        </form>
    );
}