import { useFormikContext } from "formik";
import Input from "./Input";

export default function FormField({
  label,
  name,
  type,
  placeholder,
  noIcon,
  className,
}: any) {
  const { handleChange, values, errors, touched, setTouched } =
    useFormikContext<any>(); // Provide type 'any' to useFormikContext

  const changeFormField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
    handleChange(e);
  };

  return (
    <Input
      id={name}
      name={name}
      type={type}
      value={values[name]}
      onChange={changeFormField}
      placeholder={placeholder}
      label={label}
      error={touched[name] && errors[name]}
      noIcon={noIcon}
      className={className}
    />
  );
}
