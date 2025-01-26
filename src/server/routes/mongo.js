const { Router } = require("express");
const {
	addOrUpdateMap,
	deleteMap,
	getMap,
	getMapNames,
} = require("../api/mongo");

const router = Router();

/* Add a new map */
router.post("/api/mongo/add-map", async (req, res) => {
	try {
		const mapData = req.body;
		const newMap = await addOrUpdateMap(mapData);
		res.status(201).json(newMap);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

/* Delete a map */
router.delete("/api/mongo/delete-map/:name", async (req, res) => {
	try {
		const { name } = req.params;
		const deletedMap = await deleteMap(name);
		if (!deletedMap) return res.status(404).json({ error: "Map not found" });
		res.status(200).json(deletedMap);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

/* Update a map */
router.post("/api/mongo/update-map/:name", async (req, res) => {
	try {
		const { name } = req.params;
		const updates = req.body;
		const updatedMap = await addOrUpdateMap(name, updates);
		if (!updatedMap) return res.status(404).json({ error: "Map not found" });
		res.status(200).json(updatedMap);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

/* Retrieve a specific map */
router.get("/api/mongo/map", async (req, res) => {
	try {
		const { name } = req.query;
		const map = await getMap(name);
		if (!map) return res.status(404).json({ error: "Map not found" });
		res.status(200).json(map);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

/* Retrieve all map names */
router.get("/api/mongo/maps", async (req, res) => {
	try {
		const mapNames = await getMapNames();
		res.status(200).json(mapNames);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
