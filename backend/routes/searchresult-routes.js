const searchResultController = require("../controllers").searchResult;
const router = require("express").Router();

router.get("/", searchResultController.getAll);
router.post("/", searchResultController.create);
router.delete("/:id", searchResultController.removeById);

module.exports = router;
