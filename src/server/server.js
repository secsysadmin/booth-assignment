/*
require('dotenv').config() must be ran before the remaining imports!
The APIs require the environment variables to be loaded!
*/
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
