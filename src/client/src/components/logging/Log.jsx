import React from "react";

const Log = ({ logs, verboseMode, debugMode, showTimestamp }) => {
	const renderLogMessage = (log, index) => {
		const { severity, message, timestamp, verbose } = log;

		if (verbose && !verboseMode) return null;
		/* Not sure if we want this yet */
		// if (severity === 'newline') {
		//   return <div key={index} className="log-newline"></div>;
		// }

		let logClass = "";
		switch (severity) {
			case "error":
				logClass = "text-red-500";
				break;
			case "warning":
				logClass = "text-orange-400";
				break;
			case "info":
				logClass = "text-blue-500";
				break;
			case "debug":
				if (!debugMode) return null;
				logClass = "text-[#aaa]";
				break;
			default:
				logClass = "text-blue-500";
		}

		return (
			<div
				key={index}
				style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
				className={`mx-2 px-[2px] py-[4px] whitespace-pre-wrap ${logClass} ${
					verbose ? " verbose" : ""
				}`}
			>
				{showTimestamp && (
					<span className="font-bold opacity-80">{timestamp}: </span>
				)}
				{message}
			</div>
		);
	};

	return (
		<div className="bg-[#2c3035] border border-[#444] rounded-lg max-h-[800px] overflow-x-hidden mt-[10px] mb-5 flex-grow font-verdana break-words scroll-[#444_#2c3035]">
			{logs.length === 0 ? (
				<div className="text-[#aaa] flex justify-center italic p-3">
					No logs yet...
				</div>
			) : (
				logs.map((log, index) => renderLogMessage(log, index))
			)}
		</div>
	);
};

export default Log;
