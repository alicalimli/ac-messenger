const InputForm = ({
	label,
	type,
	placeHolder,
	inputRef,
	isControlled,
	state,
	setState,
}) => {
	return (
		<label htmlFor={`${label}-input`} className="flex flex-col gap-2 relative">
			{label}
			{isControlled ? (
				<input
					type={type}
					value={state}
					ref={inputRef || null}
					onChange={(e) => setState(e.target.value)}
					onBlur={(e) => setState(e.target.value)}
					placeholder={placeHolder}
					id={label}
					className="p-2 px-4 rounded-xl border peer invalid:border-red-600"
				/>
			) : (
				<input
					type={type}
					ref={inputRef}
					placeholder={placeHolder}
					id={label}
					className="p-2 px-4 rounded-xl border  peer"
				/>
			)}
			<p className="hidden peer-invalid:block text-red-600 text-sm">Please provide a valid {label}</p>
		</label>
	);
};

export default InputForm;
