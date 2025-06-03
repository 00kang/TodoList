"use client";

import { TodoAddSection, TodoListSection } from "@/components/home";
import { getTodoList, patchTodoItem, postTodoItem } from "@/lib/api";
import { TENANT_ID } from "@/lib/constants";
import {
  getTodoListResponse,
  patchTodoItemRequest,
  postTodoItemResponse,
  Todo,
} from "@/lib/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const goToDetail = (todo: Todo) => {
    const query = new URLSearchParams({
      text: todo.text,
      state: todo.state,
    }).toString();

    router.push(`/items/${todo.id}?${query}`);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const items = await getTodoList(TENANT_ID);
        const todosFromServer: Todo[] = items.map(
          (item: getTodoListResponse) => ({
            id: item.id,
            text: item.name,
            state: item.isCompleted ? "Active" : "Default",
          }),
        );
        setTodos(todosFromServer);
      } catch (e) {
        console.error("할 일 목록 불러오기 실패", e);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const trimmed = inputValue.trim();
    if (trimmed === "") return;

    try {
      const newItem: postTodoItemResponse = await postTodoItem(TENANT_ID, {
        name: trimmed,
      });
      const newTodo: Todo = {
        id: newItem.id,
        text: newItem.name,
        state: "Default",
      };
      setTodos((prev) => [...prev, newTodo]);
      setInputValue("");
    } catch (e) {
      console.error("할 일 추가 실패", e);
    }
  };

  const toggleTodoState = async (id: number) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;

    const updated: patchTodoItemRequest = {
      name: target.text,
      memo: "",
      imageUrl: "",
      isCompleted: target.state === "Default",
    };

    try {
      await patchTodoItem(TENANT_ID, String(id), updated);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                state: todo.state === "Default" ? "Active" : "Default",
              }
            : todo,
        ),
      );
    } catch (e) {
      console.error("할 일 상태 변경 실패", e);
    }
  };

  return (
    <div className="w-full space-y-10 py-6">
      {/* 입력 영역 */}
      <TodoAddSection
        inputValue={inputValue}
        onInputChange={setInputValue}
        onAddTodo={handleAddTodo}
        hasTodos={todos.length > 0}
      />

      {/* 리스트 영역 */}
      <TodoListSection
        todos={todos}
        onToggle={toggleTodoState}
        onClickItem={goToDetail}
      />
    </div>
  );
}
