const Button = ({ type, className, icon, label, onClick, disabled }) => {
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex items-center gap-1">
          {label} {icon && icon}
        </div>
      </button>
    </>
  );
};

export default Button;
