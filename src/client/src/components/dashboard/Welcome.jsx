import boothImage from "../../assets/booth-assignment-welcome.png";

const Welcome = () => {
	return (
		<div className="flex flex-col items-center justify-center py-5 text-center text-gray-700 bg-gray-100">
			<h1
				className="text-4xl uppercase tracking-wider py-[12px] px-6 rounded-[12px]"
				style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
			>
				Booth Assignment
			</h1>
			<img src={boothImage} alt="Booth" className="p-5 bg-transparent" />
		</div>
	);
};

export default Welcome;
