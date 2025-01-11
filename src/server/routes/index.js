const { Router } = require("express");
const mongoRoutes = require("./mongo");
const sheetsRoutes = require("./sheets");

const router = Router();

router.use(mongoRoutes);
router.use(sheetsRoutes);

module.exports = router;
