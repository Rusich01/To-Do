import { CiTrash } from "react-icons/ci";
import { useTodoStore } from "../store/use-todo-store";
import { TbPencil } from "react-icons/tb";
import { useEffect } from "react";

const TodoList = () => {
  const { todos, removeTodo, toggleTodo, openModal, setIdTodo, fetchTodos } =
    useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    todos.length > 0 && (
      <ul className="space-y-3 border border-amber-50 rounded-2xl shadow-sm p-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between gap-3 p-2 shadow-2xs hover:bg-gray-50 rounded-xl w-full"
          >
            <label className="flex items-center gap-3">
              <input
                className="cursor-pointer gap-3 active:scale-95 duration-75"
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => toggleTodo(todo.id)}
              />

              <span
                className={`cursor-pointer flex ${todo.isChecked ? "text-gray-400 line-through" : "text-black "}`}
              >
                {todo.title}
              </span>
            </label>

            <div className="flex flex-row">
              <button
                aria-label="Edit todo"
                onClick={() => {
                  setIdTodo(todo.id);
                  openModal();
                }}
              >
                <TbPencil className="hover:text-yellow-500 cursor-pointer active:scale-85 duration-75 text-xl" />
              </button>
              <button
                aria-label="Delete todo"
                onClick={() => removeTodo(todo.id)}
              >
                <CiTrash className="hover:text-red-500 cursor-pointer active:scale-85 duration-75 text-xl" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  );
};

export default TodoList;
