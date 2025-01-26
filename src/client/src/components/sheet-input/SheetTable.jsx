import { useSheet } from "../../context/SheetContext";
import InfoIcon from "../utils/InfoIcon";
import TableCell from "./TableCell";

const SheetInfo = () => {
	const { inputs, errors, handleInputChange } = useSheet();

	const handleBlur = () => {};

	return (
		<div className="px-4 mb-1 flex justify-center text-gray-400 font-momo">
			<table className="border-[16px] bg-[#2d3640] border-[#2d3640]">
				<thead className="font-bold text-xl text-center">
					<tr>
						<th className="">Spreadsheet</th>
						<th>
							Spreadsheet URL
							<InfoIcon
								text="The URL of the Google Spreadsheet. This can be taken directly from the search bar."
								iconClass="w-6 h-6 mx-1"
							/>
						</th>
						<th>
							Sheet Name
							<InfoIcon
								text="The name of the specific sheet within the spreadsheet."
								iconClass="w-6 h-6 mx-1"
							/>
						</th>
						<th>
							Sheet Range
							<InfoIcon
								text='The range of cells in the sheet.\n\nThe default behavior is to read the entire sheet starting from A1. If you wish to specify the exact location within your sheet, please specify the range in the format "A1:C10"'
								iconClass="w-6 h-6 mx-1"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="font-bold text-lg">Preference</td>
						<TableCell
							value={inputs.preferenceSheetUrl}
							name="preferenceSheetUrl"
							onChange={handleInputChange}
							onBlur={handleBlur}
							error={errors.preferenceSheetUrl}
							placeholder="see above"
						/>
						<TableCell
							value={inputs.preferenceSheetName}
							name="preferenceSheetName"
							onChange={handleInputChange}
							onBlur={handleBlur}
							error={errors.preferenceSheetName}
							placeholder="Company Preferences"
						/>
						<TableCell
							value={inputs.preferenceSheetRange}
							name="preferenceSheetRange"
							onChange={handleInputChange}
							onBlur={handleBlur}
							error={errors.preferenceSheetRange}
							placeholder="The entire sheet"
						/>
					</tr>
					<tr>
						<td className="text-lg font-bold">Output</td>
						<TableCell
							value={inputs.outputSheetUrl}
							name="outputSheetUrl"
							onChange={handleInputChange}
							onBlur={handleBlur}
							error={errors.outputSheetUrl}
							placeholder="see above"
						/>
						<TableCell
							value={inputs.outputSheetName}
							name="outputSheetName"
							onChange={handleInputChange}
							onBlur={handleBlur}
							error={errors.outputSheetName}
							placeholder="Booth Assignments"
						/>
						<TableCell
							value={inputs.outputSheetRange}
							name="outputSheetRange"
							onChange={handleInputChange}
							onBlur={handleBlur}
							error={errors.outputSheetRange}
							placeholder="The entire sheet"
						/>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SheetInfo;
