import './general.css';

function Input({ label, type, className, value, setValue, icon, inputAttributes }) {
  // Cette fonction gère le changement de valeur
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={className}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleInput}
        {...inputAttributes}
      />
      {icon && icon}
    </div>
  );
}

export default Input;
