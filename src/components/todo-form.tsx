import React, { useState } from "react";
import { useTodoStore } from "../store/use-todo-store";
import { LuSend } from "react-icons/lu";

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const { addTodo, loading } = useTodoStore();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === "") return setTitle("");

    addTodo(title);
    setTitle("");
  };

  return (
    <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`flex-1 border rounded-lg px-3 py-2 outline-none text-black disable:${loading}`}
        placeholder="Add a new task..."
      />

      <button
        aria-label="Add todo"
        disabled={loading}
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 cursor-pointer active:scale-95 duration-75 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="block h-5 w-5 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
        ) : (
          <LuSend />
        )}
      </button>
    </form>
  );
};

export default TodoForm;
