const mongoose = require("mongoose");

const boothMapSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	rows: { type: Number, required: true },
	cols: { type: Number, required: true },
	grid: {
		topBooths: [
			[
				{
					type: {
						number: { type: Number, required: true },
						disabled: { type: Boolean, required: true },
					},
					required: true,
				},
			],
		],
		bottomBooths: [
			[
				{
					type: {
						number: { type: Number, required: true },
						disabled: { type: Boolean, required: true },
					},
					required: true,
				},
			],
		],
		columnLetters: { type: [String], required: true },
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("maps", boothMapSchema);

/*

A booth is comprised of
  value: Number
  disabled: Boolean

The map is comprised of booths. Each index in the following array represents a
letter. However, this mapping is not 1:1. Since middle columns are two columns
thick, we have to consider that when mapping. This is the mapping of character
to index:

If the index is the first or last of the array, it is an edge column. There is
only one index for this letter.
if (i === 0 || i === cols - 1) return String.fromCharCode(65 + Math.ceil(i / 2));
Otherwise, it is a middle column. There are two indices associated with this
letter.
return String.fromCharCode(65 + Math.floor((i - 1) / 2) + 1);

So, that means our array can look like this:
[
  0: [1, 2, ..., n]
  1: [1, 2, ..., n]
  2: [n + 1, n + 2, ..., 2n]
  3: [1, 2, ..., n]
]
where n = number of rows. Here, the letter A maps to index 1, the letter B maps
to indices 2 and 3, and the letter C maps to index 3.

An alternative way to store this is as follows:
[
  0: [1, 2, ..., n]
  1: [1, 2, ..., 2n]
  2: [1, 2, ..., n]
]
where again n = number of rows. Here, the letter A maps to index 1, the letter B
maps to index 1, and the letter C maps to index 2.

For rendering, it may be the case that the first format is desired as it better
splits the top and bottom booths. Moreover, the arrays are all the same length.
However, the split is always known - the middle columns are exactly 2x in
length.

*/
