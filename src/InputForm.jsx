const InputForm = ( {label, type, placeHolder, inputRef} ) => {
	return (
		<label htmlFor={`${label}-input`} className="flex flex-col gap-2 group active ">
			{label}
			<input
				type={type}
				ref={inputRef}
				placeholder={placeHolder}
				id={label}
				className="p-2 px-4 rounded-xl border"
			/>
			<p className="hidden group-active:block">wrong</p>
		</label>
	);
};

export default InputForm;

