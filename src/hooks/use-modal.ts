import { useEffect, type RefObject } from "react";
import { useTodoStore } from "../store/use-todo-store";

interface UseModalProps {
  inputRef: RefObject<HTMLInputElement | null>;
}

export const useModal = ({ inputRef }: UseModalProps) => {
  const { todos, isOpen, closeModal, updateTodo, idTodo } = useTodoStore();

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === idTodo);

    if (todo && inputRef.current) {
      inputRef.current.value = todo.title;
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal, idTodo, todos, inputRef]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value.trim();
    if (!inputValue) return;

    closeModal();
    updateTodo(idTodo, inputValue);
    if (inputRef.current) inputRef.current.value = "";
  };
  return { inputRef, handleSubmit, isOpen, closeModal };
};
