const InputForm = ({
  label,
  invalidLabel,
  type,
  placeHolder,
  inputRef,
  isControlled,
  state,
  setState,
  minLength,
}) => {
  return (
    <label htmlFor={`${label}-input`} className="flex flex-col gap-2 relative">
      {label}
      {isControlled ? (
        <input
          className="p-2 px-4 rounded-xl border peer invalid:border-red-600"
          type={type}
          value={state}
          ref={inputRef || null}
          minLength={minLength}
          placeholder={placeHolder}
          id={label}
          onChange={(e) => setState(e.target.value)}
          onBlur={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          className="p-2 px-4 rounded-xl border  peer"
          type={type}
          ref={inputRef}
          placeholder={placeHolder}
          id={label}
        />
      )}
      <p className="hidden peer-invalid:block text-red-600 text-sm">
        {invalidLabel}
      </p>
    </label>
  );
};

export default InputForm;
