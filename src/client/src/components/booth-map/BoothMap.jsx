import React, { useState } from "react";
import BoothMapGrid from "./BoothMapGrid";
import SaveMapModal from "./SaveMapModal";
import LoadMapModal from "./LoadMapModal";
import { useBoothMap } from "../../context/BoothMapContext";

const BoothMap = () => {
	const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
	const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
	const { boothMap, setBoothMap, resetBoothMap } = useBoothMap();

	const baseUrl = import.meta.env.VITE_API_BASE_URL;

	const handleSaveMap = async (name) => {
		try {
			const boothMapData = {
				name,
				rows: boothMap.rows,
				cols: boothMap.cols,
				grid: boothMap.grid,
			};
			console.log(boothMapData);

			const response = await fetch(`${baseUrl}/api/mongo/add-map`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(boothMapData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Error saving map:", errorData.error);
				alert(`Failed to save map: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Error saving map:", error);
			alert(`An error occurred while saving the map: ${error.message}`);
		}
	};

	const handleLoadMap = async (name) => {
		const response = await fetch(`${baseUrl}/api/mongo/map?name=${name}`);

		if (response.ok) {
			const data = await response.json();
			console.log;
			setBoothMap(data);
		} else {
			alert("Something went wrong. Please try again");
		}
	};

	return (
		<div className="py-3 min-w-[80vw]">
			<header className="text-gray-300 font-bond flex justify-between">
				<span
					className="text-2xl uppercase tracking-wide"
					style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
				>
					Configure Booth Map
				</span>

				<div className="justify-between">
					<button
						className="bg-green-600 text-white active:bg-green-800 text-md font-bold uppercase px-3 py-1 rounded-md outline-none focus:outline-none mr-3 ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105"
						onClick={() => setIsSaveModalOpen(true)}
					>
						Save
					</button>

					<button
						className="bg-indigo-500 text-white active:bg-indigo-700 text-md font-bold uppercase px-3 py-1 rounded-md outline-none focus:outline-none mr-3 ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105"
						onClick={() => setIsLoadModalOpen(true)}
					>
						Load
					</button>

					<button
						className="bg-red-500 text-white active:bg-red-700 text-md font-bold uppercase px-3 py-1 rounded-md outline-none focus:outline-none ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105"
						onClick={resetBoothMap}
					>
						Clear
					</button>
				</div>
			</header>
			<BoothMapGrid />

			<SaveMapModal
				isOpen={isSaveModalOpen}
				onClose={() => setIsSaveModalOpen(false)}
				onSave={handleSaveMap}
			/>

			<LoadMapModal
				isOpen={isLoadModalOpen}
				onClose={() => setIsLoadModalOpen(false)}
				onLoad={handleLoadMap}
			/>
		</div>
	);
};

export default BoothMap;
