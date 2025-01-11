import React from "react";
import { useLog } from "../../context/LogContext";
import CopyToClipboard from "../utils/CopyToClipboard";
import Log from "./Log";

const LogContainer = () => {
	const { logs, toggleSetting, clearLogs } = useLog();

	return (
		<div className="">
			<header className="text-gray-300 font-bond flex justify-between mt-2">
				<div className="inline-flex items-center">
					<span
						className="text-2xl uppercase tracking-wide"
						style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
					>
						Log
					</span>
					<CopyToClipboard textToCopy={logs.data} iconTitle="Copy Logs" />
				</div>

				<div className="justify-between gap-1">
					<label className="mr-3 text-lg">
						<input
							type="checkbox"
							className="mr-1"
							checked={logs.showTimestamp}
							onChange={() => toggleSetting("showTimestamp")}
						/>
						Show Timestamp
					</label>

					<label className="mr-3 text-lg">
						<input
							type="checkbox"
							className="mr-1"
							checked={logs.verboseMode}
							onChange={() => toggleSetting("verboseMode")}
						/>
						Verbose
					</label>

					<label className="mr-3 text-lg">
						<input
							type="checkbox"
							className="mr-1"
							checked={logs.debugMode}
							onChange={() => toggleSetting("debugMode")}
						/>
						Debug
					</label>

					<button
						className="bg-red-500 text-white active:bg-red-700 text-md font-bold uppercase px-3 py-1 rounded-md outline-none focus:outline-none ease-linear transition-all duration-150 hover:shadow-lg hover:scale-105"
						onClick={clearLogs}
					>
						Clear
					</button>
				</div>
			</header>

			<Log
				logs={logs.data}
				verboseMode={logs.verboseMode}
				debugMode={logs.debugMode}
				showTimestamp={logs.showTimestamp}
			/>
		</div>
	);
};

export default LogContainer;
