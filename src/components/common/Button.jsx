const Button = ({ type, className, icon, label, onClick }) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick}>
        {label} {icon && icon}{" "}
      </button>
    </>
  );
};

export default Button;
