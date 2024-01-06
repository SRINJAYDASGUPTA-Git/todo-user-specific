"use client"
import AddTodoForm from '@/components/shared/AddTodo';
import TodoList from '@/components/shared/TodoList';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react';
export default function Home() {
  const { user } = useUser();
  const [todos, setTodos] = useState([]); // Initialize with an empty array
  return (
    <>
      <main className='m-auto max-w-[400px]'>
        <div className='py-[1rem] px-[2rem] flex flex-col items-center'>
          <SignedIn>
            <span className='py-[1rem] px[2rem]'>Welcome {user?.firstName}!</span>
            <AddTodoForm todos={todos} setTodos={setTodos} />
            <TodoList todos={todos} setTodos={setTodos} user_id={user?.id || ''} />
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
