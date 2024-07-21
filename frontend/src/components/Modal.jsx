import { RxCross2 } from "react-icons/rx";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useDetectClickOutside from "../hooks/useDetectClickOutside";

const modalContext = createContext();
function Modal({ children }) {
  const [openModal, setOpenModal] = useState("");
  const close = () => setOpenModal("");
  const open = setOpenModal;
  return (
    <modalContext.Provider value={{ openModal, close, open }}>
      {children}
    </modalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(modalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}
function Window({ name, children }) {
  const { openModal, close } = useContext(modalContext);
  const { ref } = useDetectClickOutside(close);
  if (name !== openModal) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-[1000] h-screen w-screen bg-[#ffffff530] backdrop-blur-sm">
      <div
        ref={ref}
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white p-4"
      >
        <div onClick={close} className="text-lg">
          <RxCross2 />
        </div>
        <div>{cloneElement(children, { closeModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
