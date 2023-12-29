import Filters from "@/components/Filters/Filters";
import Todos from "@/components/Todos/Todos";
import { Todo } from "./types/types";
import { AddTodo } from "@/components/AddTodo/AddTodo";

async function getData() {
  const res = await fetch("http://localhost:3000/api/todo");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { todos } = await res.json();

  return todos;
}

export default async function Home() {
  const todos: Todo[] = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-4xl ">To-do</h2>
      <div className="w-[40rem]">
        <AddTodo />
        <Filters />
        <Todos todos={todos} />
      </div>
    </main>
  );
}
