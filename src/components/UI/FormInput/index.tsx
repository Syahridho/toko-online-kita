import Input from "../Input";
import Label from "../Label";

type PropTypes = {
  type: "number" | "text" | "file" | "email" | "password";
  id: string;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const FormInput = (props: PropTypes) => {
  const { type, id, title, placeholder, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{title}</Label>
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
