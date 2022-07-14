import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const InputForm = ({
  label,
  invalidLabel,
  type,
  placeHolder,
  inputRef,
  isValid,
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
        <p className="text-black dark:text-white">{label}</p>
        {type === "password" ? (
          <a className="cursor-pointer" onClick={handleShowPass}>
            {inputType === "password" ? (
              <BsFillEyeSlashFill className="text-muted text-lg" />
            ) : (
              <BsFillEyeFill className="text-muted text-lg text-primary-main" />
            )}
          </a>
        ) : (
          ""
        )}
      </div>

      <input
        className="text-lg bg-transparent p-2 px-4 flex items-center rounded-xl outline-none border border-muted dark:border-muted-dark hover:border-primary-main dark:hover:border-primary-main focus:border-primary-main dark:focus-primary-main invalid:border-red-600 dark:invalid:border-red-500 duration-200 text-black dark:text-white"
        type={inputType}
        value={state}
        ref={inputRef || null}
        minLength={minLength}
        placeholder={placeHolder}
        id={label}
        onChange={(e) => setState && setState(e.target.value)}
        onBlur={(e) => setState && setState(e.target.value)}
      />

      {!isValid && state &&
      <p className="text-red-600 text-sm dark:text-red-500">
        {invalidLabel}
      </p>
      }
    </label>
  );
};

export default InputForm;
