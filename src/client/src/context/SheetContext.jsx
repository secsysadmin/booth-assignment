import React, { createContext, useState, useContext } from "react";
import { validateSyntax } from "../utils/sheet-validation";

const SheetContext = createContext();

export const SheetProvider = ({ children }) => {
	const [inputs, setInputs] = useState({
		preferenceSheetUrl: "",
		preferenceSheetName: "",
		preferenceSheetRange: "",
		outputSheetUrl: "",
		outputSheetName: "",
		outputSheetRange: "",
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputs((prevInputs) => ({
			...prevInputs,
			[name]: value,
		}));
	};

	return (
		<SheetContext.Provider
			value={{ inputs, errors, validateSyntax, handleInputChange }}
		>
			{children}
		</SheetContext.Provider>
	);
};

export const useSheet = () => useContext(SheetContext);
