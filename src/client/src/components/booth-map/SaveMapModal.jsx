import React, { useState, useEffect } from "react";

const SaveMapModal = ({ isOpen, onClose, onSave }) => {
	const [name, setName] = useState("");
	const [mapNames, setMapNames] = useState([]);
	const [isNameTaken, setIsNameTaken] = useState(false); // To track if name exists
	const [isConfirmOverwrite, setIsConfirmOverwrite] = useState(false); // To confirm overwrite

	useEffect(() => {
		const fetchMapNames = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/mongo/maps`
			);
			if (response.ok) {
				const data = await response.json();
				setMapNames(data.map((map) => map.name));
			}
		};

		if (isOpen) fetchMapNames();
	}, [isOpen]);

	const checkNameAvailability = async (mapName) => {
		setIsNameTaken(mapNames.includes(mapName.trim()));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isNameTaken) {
			setIsConfirmOverwrite(true);
		} else {
			onSave(name);
			setName("");
			onClose();
		}
	};

	const handleOverwrite = () => {
		onSave(name);
		setName("");
		setIsConfirmOverwrite(false);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-8 rounded-lg w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4">Save Map</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onBlur={() => checkNameAvailability(name)}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md"
							required
						/>
						{/* {isNameTaken && !isConfirmOverwrite && (
							<p className="text-red-500 text-sm">
								This name is already in use. Do you want to overwrite it?
							</p>
						)} */}
					</div>

					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={() => {
								setName("");
								setIsNameTaken(false);
								setIsConfirmOverwrite(false);
								onClose();
							}}
							className="bg-gray-300 text-black px-4 py-2 uppercase rounded-md outline-none focus:outline-none ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105"
						>
							Cancel
						</button>
						<button className="bg-green-600 text-white active:bg-green-800 text-md font-bold uppercase px-4 py-1 rounded-md outline-none focus:outline-none  ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105">
							Save Map
						</button>
					</div>
				</form>

				{isConfirmOverwrite && (
					<div className="mt-4 text-center">
						<p className="text-red-600 font-bold">
							This name is already in use. Do you want to overwrite it?
						</p>

						<div className="flex justify-center gap-2 mt-3">
							<button
								onClick={handleOverwrite}
								className="bg-red-500 text-white px-3 py-2 rounded-md  uppercase outline-none focus:outline-none ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105"
							>
								Overwrite
							</button>
							<button
								onClick={() => setIsConfirmOverwrite(false)}
								className="bg-gray-300 text-black px-3 py-2 uppercase rounded-md outline-none focus:outline-none ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105"
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SaveMapModal;
