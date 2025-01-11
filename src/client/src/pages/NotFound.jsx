import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	const onHome = () => {
		navigate("/dashboard");
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-[#282b24] text-[#f1eedb] font-sans">
			<div className="text-center mb[1rem] mx-[2rem]">
				<p className="uppercase text-4xl my-[1.5rem] mb-[3rem] tracking-[0.2rem] leading-normal">
					The page you are looking for does not exist
				</p>
			</div>
			<div className="mt-20">
				<button
					onClick={onHome}
					className="bg-[#f1eedb] text-[#282b24] font-sans text-xl md:text-1xl uppercase tracking-wider py-[12px] px-6 rounded-[12px] transition-all ease-in-out duration-300 hover:bg-[#c9c7b3] hover:transform hover:translate-y-[-2px] shadow-[0px_4px_6px_rgba(0,_0,_0,_0.8)] hover:shadow-[0px_6px_10px_rgba(0,_0,_0,_0.3)]"
				>
					Go Home
				</button>
			</div>
		</div>
	);
};

export default NotFound;
