const mongoose = require("mongoose");
const BoothMap = require("../models/booth-map");

const clientOptions = {
	serverApi: { version: "1", strict: true, deprecationErrors: true },
	tls: true,
	dbName: "booth-assignment",
};

/* Single instance client */
mongoose
	.connect(process.env.MONGO_URI, clientOptions)
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

async function addOrUpdateMap(data) {
	const { name, rows, cols, grid } = data;

	const updatedMap = await BoothMap.findOneAndUpdate(
		{ name },
		{
			rows,
			cols,
			grid,
			updatedAt: new Date(),
		},
		{
			new: true,
			upsert: true,
			setDefaultsOnInsert: true,
		}
	);

	return updatedMap;
}

async function deleteMap(name) {
	return await BoothMap.findOneAndDelete({ name });
}

/* Retrieving a specific map */
async function getMap(name) {
	return await BoothMap.findOne({ name });
}

async function getMapNames() {
	return await BoothMap.find({}, { name: 1 });
}

module.exports = {
	addOrUpdateMap,
	deleteMap,
	getMap,
	getMapNames,
};
