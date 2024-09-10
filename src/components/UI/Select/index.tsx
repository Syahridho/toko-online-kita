type OptionTypes = {
  label: string;
  value: string;
};

type PropTypes = {
  label: string;
  name: string;
  options: OptionTypes[] | any;
  defaultValue?: string;
  disabled?: boolean;
};

const Select = (props: PropTypes) => {
  const { label, name, options, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="mt-1 p-1 border"
      >
        {options.map((option: OptionTypes, index: number) => (
          <option value={option.value} key={index}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
