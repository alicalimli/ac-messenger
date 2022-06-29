const InputForm = ( {label, type, placeHolder} ) => {
	return (
		<label htmlFor={`${label}-input`} className="flex flex-col gap-2 ">
			{label}
			<input
				type={type}
				placeholder={placeHolder}
				id={label}
				className="p-2 px-4 rounded-xl border"
			/>
		</label>
	);
};

export default InputForm;
