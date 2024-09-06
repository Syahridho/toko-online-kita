import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

const ActionButton = (props: any) => {
  const { children } = props;
  const [action, setAction] = useState(false);
  return (
    <div className="relative">
      <button
        className="bg-slate-800 text-white px-2 py-0.5 rounded"
        onClick={() => setAction(!action)}
      >
        <FaEllipsis />
      </button>
      <div
        className={`absolute flex-col bg-white top-8 -left-7 rounded border overflow-hidden z-50 ${
          action ? "flex" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionButton;
