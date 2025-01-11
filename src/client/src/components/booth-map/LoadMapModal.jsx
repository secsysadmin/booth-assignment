import { useState, useEffect } from "react";
import Select from "react-select";

const LoadMapModal = ({ isOpen, onClose, onLoad }) => {
	const [availableMaps, setAvailableMaps] = useState([]);
	const [selectedMap, setSelectedMap] = useState(null);

	useEffect(() => {
		const fetchMapNames = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/api/mongo/maps`
				);
				if (response.ok) {
					const data = await response.json();

					const mapOptions = data.map((map) => ({
						value: map.name,
						label: map.name,
					}));
					console.log(mapOptions);
					setAvailableMaps(mapOptions);
				} else {
					console.error("Failed to fetch map names");
				}
			} catch (error) {
				console.error("Error fetching map names:", error);
			}
		};

		if (isOpen) fetchMapNames();
	}, [isOpen]);

	const handleChange = (selectedValue) => {
		setSelectedMap(selectedValue);
	};

	const handleLoad = () => {
		if (selectedMap) {
			onLoad(selectedMap.value);
			setSelectedMap(null);
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-8 rounded-lg w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4">Load Map</h2>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Search and Select Map
					</label>
					<Select
						name="maps"
						options={availableMaps}
						value={selectedMap}
						onChange={handleChange}
						isClearable
						className="w-full mt-1"
					/>
				</div>

				<div className="flex justify-end space-x-2">
					<button
						type="button"
						onClick={() => {
							setSelectedMap(null);
							onClose();
						}}
						className="bg-gray-300 text-black px-4 py-2 rounded-md"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleLoad}
						className="bg-indigo-500 text-white px-4 py-2 rounded-md"
						disabled={!selectedMap}
					>
						Load Map
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoadMapModal;
