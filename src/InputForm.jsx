const InputForm = ( {label, type, placeHolder, inputRef, isControlled, state, setState} ) => {
	return (
		{isControlled ?
		<label htmlFor={`${label}-input`} className="flex flex-col gap-2">
			{label}
			<input
				type={type}
				value = {state}
				onChange={(e) => setState(e.target.value)}
				onBlur={(e) => setState(e.target.value)}
				placeholder={placeHolder}
				id={label}
				className="p-2 px-4 rounded-xl border  peer"
			/>
			<p className="hidden peer-invalid:block">wrong</p>
		</label> :
		<label htmlFor={`${label}-input`} className="flex flex-col gap-2">
			{label}
			<input
				type={type}
				ref={inputRef}
				placeholder={placeHolder}
				id={label}
				className="p-2 px-4 rounded-xl border  peer"
			/>
			<p className="hidden peer-invalid:block">wrong</p>
		</label> }
	);
};

export default InputForm;

