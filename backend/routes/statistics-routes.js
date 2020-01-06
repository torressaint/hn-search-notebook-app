const statisticsController = require("../controllers").statistic;
const router = require("express").Router();

router.get("/", statisticsController.getAll);

module.exports = router;
