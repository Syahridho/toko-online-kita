type PropTypes = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

const Button = (props: PropTypes) => {
  const { children, type, className, disabled } = props;
  return (
    <button
      type={type}
      className={`w-full bg-slate-800 text-white py-1.5 rounded-md mt-2 shadow hover:bg-slate-950 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
