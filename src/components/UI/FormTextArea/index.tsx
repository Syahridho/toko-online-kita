import Label from "../Label";

type PropTypes = {
  id: string;
  title: string;
};

const FormTextArea = (props: PropTypes) => {
  const { id, title } = props;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{title}</Label>
      <textarea name={id} id={id} className="border shadow mt-2"></textarea>
    </div>
  );
};

export default FormTextArea;
