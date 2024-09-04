import Input from "../Input";
import Label from "../Label";

type PropTypes = {
  type: "number" | "text" | "file" | "email" | "password";
  id: string;
  title: string;
  placeholder?: string;
  setUploadImage: any;
  defaultValue?: string;
  uploadedImage?: any;
};

const FormFile = (props: PropTypes) => {
  const {
    type,
    id,
    title,
    placeholder,
    setUploadImage,
    defaultValue,
    uploadedImage,
  } = props;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{title}</Label>
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadImage(e.currentTarget.files[0]);
        }}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormFile;
