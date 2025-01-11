import React from "react";

function InfoIcon({ text, iconClass }) {
	return (
		<div className="relative inline-block cursor-pointer group">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={iconClass}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
				/>
			</svg>

			<div className="absolute w-[300px] bg-gray-800 text-white text-sm p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 left-0 transform -translate-y-full mt-1 whitespace-pre-line z-10">
				{text.split("\\n").map((line, index) => (
					<React.Fragment key={index}>
						{line}
						{index < text.split("\\n").length - 1 && <br />}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default InfoIcon;
