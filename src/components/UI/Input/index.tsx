type PropTypes = {
  type: "text" | "number" | "file" | "email" | "password";
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

const Input = (props: PropTypes) => {
  const { type, id, name, className, placeholder, disabled } = props;
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={`px-2 py-1 mt-1 border rounded-md w-full shadow-sm focus:outline-none focus:ring focus:ring-blue-300 invalid:!ring-pink-600 invalid:text-pink-600 ${className}`}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
