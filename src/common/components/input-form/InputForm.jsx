import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill, BsInfoCircleFill } from "react-icons/bs";

const InputForm = ({
  label,
  instruction,
  type,
  placeHolder,
  inputRef,
  isValid,
  state,
  setState,
  stateFocus,
  setStateFocus,
}) => {
  const [inputType, setInputType] = useState(type);
  const noSpaceLabel = label.replace(/\s+/g, '');

  const handleShowPass = (e) => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <label htmlFor={`${noSpaceLabel}-input`} className="flex flex-col gap-2 relative">
      <div className="flex flex-wrap gap-2 items-center">
        <p className="text-black dark:text-white">{label}</p>
        {type === "password" ? (
          <a className="cursor-pointer text-black dark:text-white" onClick={handleShowPass}>
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
        className={`text-lg bg-transparent p-2 px-4 flex items-center rounded-xl outline-none border duration-200 text-black dark:text-white ${!isValid && state ? instruction && 'border-red-500' : "border-muted dark:border-muted-dark hover:border-primary-main dark:hover:border-primary-main focus:border-primary-main"}`}
        id={noSpaceLabel}
        autoComplete="off"
        type={inputType}
        value={state}
        ref={inputRef || null}
        required
        aria-invalid={isValid ? false : true}
        aria-describedby={`${noSpaceLabel}-note`}
        placeholder={placeHolder}
        onChange={(e) => setState && setState(e.target.value)}
        onFocus={() => setStateFocus && setStateFocus(true)}
        onBlur={() => setStateFocus && setStateFocus(false)}
      />

      <p id={`${noSpaceLabel}-note`} className={`flex flex-col gap-2 text-sm text-muted-light dark:text-muted-dark ${stateFocus && state && !isValid  ? "visible block" : "absolute invisible"}`}>
        <BsInfoCircleFill className="text-xl"/> {instruction}
      </p>
    </label>
  );
};

export default InputForm;
