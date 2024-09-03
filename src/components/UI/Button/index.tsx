type PropTypes = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: any;
};

const Button = (props: PropTypes) => {
  const { children, type, className, onClick, disabled } = props;
  return (
    <button
      type={type}
      className={`w-full bg-slate-800 text-white py-1.5 rounded-md mt-2 shadow hover:bg-slate-950 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
