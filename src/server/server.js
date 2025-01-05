const express = require('express');
const cors = require("cors");
const app = express();
const sheetsRoutes = require('./routes/sheets');

app.use(cors());
app.use(sheetsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

