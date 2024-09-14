import Label from "../Label";

type PropTypes = {
  id: string;
  title?: string;
  defaultValue?: string;
};

const FormTextArea = (props: PropTypes) => {
  const { id, title, defaultValue } = props;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{title}</Label>
      <textarea
        name={id}
        id={id}
        className="border shadow mt-2 p-1.5"
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
};

export default FormTextArea;
