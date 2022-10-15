import { LegacyRef, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

interface InputFormProps {
  state: string;
  setState: (state: string) => void;
  label?: string;
  type: string;
  placeholder: string;
  instruction?: string;
  ref?: LegacyRef<HTMLInputElement> | undefined;
  isValid?: boolean;
  isSmall?: boolean;
  stateFocus?: boolean;
  maxLength?: number;
  className?: string;
  setStateFocus?: (state: boolean) => void;
}

const InputForm = ({
  label,
  instruction,
  type,
  placeholder,
  ref = null,
  isValid,
  isSmall,
  state,
  setState,
  className,
  stateFocus,
  setStateFocus,
  maxLength,
}: InputFormProps) => {
  const [inputType, setInputType] = useState(type);
  const noSpaceLabel = label?.replace(/\s+/g, "");

  const handleShowPass = (e: React.MouseEvent) => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <label
      htmlFor={`${noSpaceLabel}-input`}
      className="flex flex-col gap-2 relative"
    >
      <div className="flex flex-wrap gap-2 items-center">
        {label && <p className="text-black dark:text-white">{label}</p>}
        {type === "password" ? (
          <a
            className="cursor-pointer text-black dark:text-white"
            onClick={handleShowPass}
          >
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
        className={`${className} text-lg bg-transparent ${
          isSmall ? "p-1" : "p-2"
        } px-4 flex items-center rounded-xl outline-none border duration-200 text-black dark:text-white ${
          !isValid && state
            ? instruction && "border-red-500"
            : "border-muted dark:border-muted-dark hover:border-primary-main dark:hover:border-primary-main focus:border-primary-main"
        }`}
        minLength={1}
        maxLength={maxLength}
        id={noSpaceLabel}
        autoComplete="off"
        type={inputType}
        value={state}
        ref={ref}
        required
        aria-invalid={isValid ? false : true}
        aria-describedby={`${noSpaceLabel}-note`}
        placeholder={placeholder}
        onChange={(e) => setState && setState(e.target.value)}
        onFocus={() => setStateFocus && setStateFocus(true)}
        onBlur={() => setStateFocus && setStateFocus(false)}
      />

      <p
        id={`${noSpaceLabel}-note`}
        className={`gap-2 text-sm text-muted-light dark:text-muted-dark ${
          stateFocus && state && !isValid
            ? "visible block"
            : "absolute invisible"
        }`}
      >
        {instruction}
      </p>
    </label>
  );
};

export default InputForm;
