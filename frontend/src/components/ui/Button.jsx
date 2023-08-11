const Button = ({ label, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative disabled:opacity-70 disabled:cursor-not-allowed w-full bg-[#262626] text-white py-3 text-base lg:text-lg font-normal font-Poppins"
    >
      {label}
    </button>
  );
};

export default Button;
