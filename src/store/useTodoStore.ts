import { create } from "zustand";

const API_URL = "https://69a88a8937caab4b8c6203c6.mockapi.io/todo";
const API_HEADERS = { "Content-Type": "application/json" };
const API_ERROR = "Request failed";

interface Todo {
  id: string;
  title: string;
  isChecked: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  isOpen: boolean;
  error: string | null;

  // function
  idTodo: string;
  openModal: VoidFunction;
  closeModal: VoidFunction;
  fetchTodos: () => Promise<void>;
  setIdTodo: (id: string) => void;
  addTodo: (title: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,
  error: null,
  isOpen: false,
  idTodo: "",

  fetchTodos: async () => {
    set({ loading: true });

    try {
      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(API_ERROR);
      }

      set({
        loading: false,

        todos: data,
      });
    } catch (error) {
      set({
        error: "failed to fetch todos",

        loading: false,
      });
    }
  },

  addTodo: async (title) => {
    set({ loading: true });

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: API_HEADERS,

        body: JSON.stringify({
          title,

          isChecked: false,
        }),
      });

      if (!response.ok) {
        throw new Error(API_ERROR);
      }

      const newTodo = await response.json();

      set((state) => ({
        todos: [...state.todos, newTodo],

        loading: false,
      }));
    } catch {
      set({ error: "Failed to add todo" });
    }
  },

  toggleTodo: async (id) => {
    try {
      const todo = useTodoStore.getState().todos.find((todo) => todo.id === id);

      if (!todo) return;

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: API_HEADERS,

        body: JSON.stringify({
          isChecked: !todo.isChecked,
        }),
      });

      if (!response.ok) {
        throw new Error(API_ERROR);
      }

      const data = await response.json();

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
      }));
    } catch {
      set({ error: "Failed to add todo" });
    }
  },

  removeTodo: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch {
      set({ error: "Failed to delete todo" });
    }
  },

  updateTodo: async (id, title) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: API_HEADERS,

        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(API_ERROR);
      }

      const updated: Todo = await response.json();

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updated : todo)),
      }));
    } catch {
      set({ error: "Failed to update todo" });
    }
  },

  // Modal
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),

  setIdTodo: (id) => set({ idTodo: id }),
}));
