const express = require('express');
const cors = require("cors");
const sheetsRoutes = require('./routes/sheets');

const app = express();
app.use(cors());
app.use(sheetsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

