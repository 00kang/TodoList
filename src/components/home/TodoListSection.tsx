import TodoEmptyState from "@/components/home/TodoEmptyState";
import TodoItem from "@/components/home/TodoItem";
import { Todo } from "@/lib/type";
import Image from "next/image";

interface TodoListSectionProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onClickItem: (todo: Todo) => void;
}

export default function TodoListSection({
  todos,
  onToggle,
  onClickItem,
}: TodoListSectionProps) {
  const todoList = todos.filter((todo) => todo.state === "Default");
  const doneList = todos.filter((todo) => todo.state === "Active");

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:gap-6">
      {/* TODO 리스트 */}
      <div className="flex-1 gap-4">
        <Image
          src="/images/illustrations/todo.svg"
          alt="todo"
          width={100}
          height={36}
        />
        <div className="mt-4 flex items-center justify-center space-y-4">
          {todoList.length > 0 ? (
            todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                state="Default"
                onToggle={() => onToggle(todo.id)}
                onClick={() => onClickItem(todo)}
              />
            ))
          ) : (
            <TodoEmptyState
              imgSrc="/images/illustrations/todo-empty-small.svg"
              imgSrcMd="/images/illustrations/todo-empty-large.svg"
              alt="empty todo"
              message={`할 일이 없어요.\nTODO를 새롭게 추가해주세요!`}
            />
          )}
        </div>
      </div>
      {/* DONE 리스트 */}
      <div className="flex-1 gap-4">
        <Image
          src="/images/illustrations/done.svg"
          alt="done"
          width={100}
          height={36}
        />
        <div className="mt-4 flex items-center justify-center space-y-4">
          {doneList.length > 0 ? (
            doneList.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                state="Active"
                onToggle={() => onToggle(todo.id)}
                onClick={() => onClickItem(todo)}
              />
            ))
          ) : (
            <TodoEmptyState
              imgSrc="/images/illustrations/done-empty-small.svg"
              imgSrcMd="/images/illustrations/done-empty-large.svg"
              alt="empty done"
              message={`아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
