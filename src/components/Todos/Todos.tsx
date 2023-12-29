"use client";
import { Todo } from "@/app/types/types";
import TodoItem from "./TodoItem";
import { useCallback, useEffect, useState } from "react";
import { storage } from "@/utils/storage";
import { TODO_KEY } from "@/config/storageKeys";
import { Spinner } from "@nextui-org/react";

export default function Todos({ todos }: { todos: Todo[] }) {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);

  const getTodoItems = useCallback(() => {
    const storageTodo = storage.get(TODO_KEY);
    const hasTodoData = Boolean(storageTodo);

    if (!hasTodoData) {
      storage.set(TODO_KEY, todos);
    }

    return hasTodoData ? storageTodo : todos;
  }, [todos]);

  useEffect(() => {
    const todoI = getTodoItems();

    setTodoItems(todoI);
  }, [getTodoItems]);

  return (
    <ul className="items-center">
      {todoItems.length === 0 ? (
        <Spinner className="mx-auto self-center " />
      ) : (
        todoItems?.map(({ id, ...rest }) => <TodoItem key={id} {...rest} />)
      )}
    </ul>
  );
}
