import { useEffect, useRef } from "react";

type PropTypes = {
  children: React.ReactNode;
  onClose: any;
};

const Modal = (props: PropTypes) => {
  const { children, onClose } = props;

  const ref: any = useRef();

  useEffect(() => {
    const handleClickOutSide = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [onClose]);
  return (
    <div className="fixed w-screen h-screen z-50 bg-black bg-opacity-60 flex justify-center items-center top-0 left-0">
      <div
        className="bg-white p-8 rounded w-[90vw] border overflow-y-auto"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
