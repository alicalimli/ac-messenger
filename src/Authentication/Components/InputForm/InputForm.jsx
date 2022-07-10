import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

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
  const [inputType, setInputType] = useState(type);

  const handleShowPass = (e) => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <label htmlFor={`${label}-input`} className="flex flex-col gap-2 relative">
      <div className="flex flex-wrap gap-2 items-center">
        <p>{label}</p>
        {type === "password" ? (
          <a className="cursor-pointer" onClick={handleShowPass}>
            {inputType === "password" ? (
              <BsFillEyeSlashFill className="text-slate-500 text-lg" />
            ) : (
              <BsFillEyeFill className="text-slate-500 text-lg" />
            )}
          </a>
        ) : (
          ""
        )}
      </div>
      {isControlled ? (
          <input
            className="text-lg bg-transparent p-2 px-4 flex items-center rounded-xl border border-slate-400 peer outline outline-1 outline-blue-500/0 duration-200 hover:outline-blue-500 focus:outline-blue-500 invalid:outline-red-600"
            type={inputType}
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
            className="text-lg bg-transparent p-2 px-4 flex items-center rounded-xl border border-slate-400 peer outline outline-1 outline-blue-500/0 duration-200 hover:outline-blue-500 focus:outline-blue-500 invalid:outline-red-600"
            type={inputType}
            ref={inputRef}
            minLength={minLength}
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
