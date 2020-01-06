const searchQueryController = require("../controllers").searchQuery;
const router = require("express").Router();

router.get("/", searchQueryController.getAll);
router.post("/", searchQueryController.create);

module.exports = router;
