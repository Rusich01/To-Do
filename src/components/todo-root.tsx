import { useTodoStore } from "../store/useTodoStore";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import Modal from "./todo-modal";

const TodoRoot = () => {
  const { todos } = useTodoStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white w-100 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>

        <TodoForm />
        {todos.length > 0 ? (
          <p className="text-gray-400 text-sm my-2.5">todo list:</p>
        ) : (
          <p className="text-gray-400 text-sm my-2.5">not todo list ...</p>
        )}

        <TodoList />
      </div>
      <Modal />
    </div>
  );
};

export default TodoRoot;
