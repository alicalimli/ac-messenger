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
  variant?: "underline" | "default";
  stateFocus?: boolean;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
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
  autoFocus = false,
  variant,
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

  const inputVariantClass =
    variant === "underline" ? "border-b rounded-none px-0" : "border";

  const inputSizeClass = isSmall ? "p-1" : "p-2";

  const inputValidClass =
    !isValid && state
      ? instruction && "border-red-500"
      : "border-muted dark:border-muted-dark hover:border-primary-main dark:hover:border-primary-main focus:border-primary-main";

  return (
    <label
      htmlFor={`${noSpaceLabel}-input`}
      className="flex flex-col gap-2 relative"
    >
      <div className="flex flex-wrap gap-2 items-center">
        {label && <p className="text">{label}</p>}
        {type === "password" ? (
          <a className="text cursor-pointer" onClick={handleShowPass}>
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
        className={`${className} text-lg bg-transparent ${inputVariantClass} ${inputSizeClass} px-4 flex items-center rounded-xl outline-none duration-200 text ${inputValidClass}`}
        minLength={1}
        maxLength={maxLength}
        autoFocus={autoFocus}
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
        className={`text-muted text-sm gap-2 ${
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
