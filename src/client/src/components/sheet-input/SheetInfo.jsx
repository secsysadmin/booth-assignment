import CopyToClipboard from "../utils/CopyToClipboard";

const SheetInfo = () => {
	return (
		<div className="p-3 flex-col text-center text-gray-300 font-semibold font-mono mb-3">
			<div className="mb-3">
				By default, this{" "}
				<a
					className="text-blue-500"
					href={import.meta.env.VITE_DEFAULT_PREFERENCE_SHEET_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					Preference Sheet
				</a>{" "}
				and{" "}
				<a
					className="text-blue-500"
					href={import.meta.env.VITE_DEFAULT_OUTPUT_SHEET_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					Output Spreadsheet
				</a>{" "}
				will be used.
			</div>

			<div className="mb-3">
				If you use different spreadsheets, please make sure that both your
				Preference Spreadsheet and Output Spreadsheet give access to the
				following email as an <em>editor</em>
				:
				<br />
				<span className="inline-flex items-center">
					{import.meta.env.VITE_SHEET_API_EMAIL}
					<CopyToClipboard
						textToCopy={import.meta.env.VITE_SHEET_API_EMAIL}
						iconTitle="Copy Email"
					/>
				</span>
			</div>

			<div className="">
				Placeholder values represent the default values. Leave a cell blank if
				you wish to use the default value.
			</div>
		</div>
	);
};

export default SheetInfo;
