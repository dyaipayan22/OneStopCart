const Button = ({ label, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg w-full bg-[#525FE1] text-white py-3 text-lg font-medium font-Poppins"
    >
      {label}
    </button>
  );
};

export default Button;
