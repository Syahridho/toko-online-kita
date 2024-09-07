import Input from "../Input";
import Label from "../Label";

type PropTypes = {
  id: string;
  title: string;
  placeholder?: string;
  setUploadImage?: any;
  defaultValue?: string;
  uploadedImage?: any;
};

const FormFile = (props: PropTypes) => {
  const {
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
        type="file"
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
