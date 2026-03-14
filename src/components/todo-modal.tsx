import { LuSend } from "react-icons/lu";
import { createPortal } from "react-dom";

import { IoClose } from "react-icons/io5";
import { useModal } from "../hooks/useModal";

const Modal = () => {
  const { title, setTitle, handleSubmit, isOpen, closeModal } = useModal();

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={closeModal}
    >
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        className="bg-white rounded-2xl shadow-xl p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex justify-between">
          <h1 className="text-2xl font-bold text-center mb-6">Edit Modal</h1>
          <IoClose
            onClick={closeModal}
            className="text-[20px] cursor-pointer active:scale-80 mb-6 duration-75 hover:text-red-500"
          />
        </div>

        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 outline-none text-black"
          />

          <button
            type="submit"
            className="flex items-center justify-center bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 active:scale-95 duration-75"
          >
            <LuSend />
          </button>
        </div>
      </form>
    </div>,
    modalRoot,
  );
};

export default Modal;
