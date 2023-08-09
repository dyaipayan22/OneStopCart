/* eslint-disable react/prop-types */
const Input = ({
  id,
  label,
  type,
  placeholder,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className=" relative flex flex-col gap-1">
      <label className="text-md">{label}</label>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        className={`p-2 border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed border-neutral-500
        ${errors[id] ? 'focus:border-rose-400' : 'border-neutral-500'}`}
      />
    </div>
  );
};

export default Input;
