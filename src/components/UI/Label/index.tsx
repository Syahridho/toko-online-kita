type PropTypes = {
  children: React.ReactNode;
  htmlFor: string;
};

const Label = (props: PropTypes) => {
  const { children, htmlFor } = props;
  return (
    <label htmlFor={htmlFor} className="font-semibold">
      {children}
    </label>
  );
};

export default Label;
