import { useEffect, useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

export const useModal = () => {
  const { todos, isOpen, closeModal, updateTodo, idTodo } = useTodoStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === idTodo);

    if (todo) {
      setTitle(todo.title);
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal, idTodo, todos]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") return setTitle("");

    closeModal();
    updateTodo(idTodo, title);
    setTitle("");
  };
  return { title, setTitle, handleSubmit, isOpen, closeModal };
};
