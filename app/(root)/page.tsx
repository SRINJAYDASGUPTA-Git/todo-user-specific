"use client"
import AddTodoForm from '@/components/shared/AddTodo';
import TodoList from '@/components/shared/TodoList';
import { getTodos } from '@/lib/supabaserequests';
import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react';
export default function Home() {
  const { user } = useUser();
  const { userId, getToken } = useAuth();
  const [todos, setTodos] = useState([]); // Initialize with an empty array
  const [loadingTodos, setLoadingTodos] = useState(false);
  useEffect(() => {
    const loadTodos = async () => {
      const token = await getToken({ template: 'supabase' });
      const todos = await getTodos({ userId: userId!, supabaseAccessToken: token! });
      setTodos(todos as never[]);
    }
    loadTodos();
  })
  return (
    <>
      <main className='m-auto max-w-[400px]'>
        <div className='py-[1rem] px-[2rem] flex flex-col items-center'>
          <SignedIn>
            <span className='py-[1rem] px[2rem]'>Welcome {user?.firstName}!</span>
            <AddTodoForm todos={todos} setTodos={setTodos} />
            <TodoList todos={todos} />
          </SignedIn>
          <SignedOut>
            <div className='py-[1rem] px[2rem]'>
              Sign in to create your todo list!
            </div>
          </SignedOut>
        </div>
      </main>
    </>
  )
}
