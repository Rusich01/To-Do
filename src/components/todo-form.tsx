import React, { useRef } from "react";
import { useTodoStore } from "../store/use-todo-store";
import { LuSend } from "react-icons/lu";

const TodoForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addTodo, loading } = useTodoStore();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value.trim();
    if (!inputValue) return;

    addTodo(inputValue);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={`flex-1 border rounded-lg px-3 py-2 outline-none text-black disable:${loading}`}
        placeholder="Add a new task..."
      />

      <button
        aria-label="Add todo"
        disabled={loading}
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 cursor-pointer active:scale-95 duration-75 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && (
          <span className="block h-5 w-5 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
        )}
        {!loading && <LuSend />}
      </button>
    </form>
  );
};

export default TodoForm;
