/* eslint-disable react/prop-types */
const Input = ({
  id,
  label,
  placeholder,
  type,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className=" relative flex flex-col ">
      <label className="text-base font-Poppins font-medium">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(id, { required })}
        className={`bg-transparent outline-none focus:outline-none border-b-2 border-b-neutral-400 focus:border-b-black pb-1 active:border-b-black font-Poppins text-base font-normal w-full`}
      />
    </div>
  );
};

export default Input;
