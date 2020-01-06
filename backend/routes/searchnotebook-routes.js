const searchNotebookController = require("../controllers").searchNotebook;
const router = require("express").Router();

router.get("/", searchNotebookController.getAll);
router.post("/", searchNotebookController.create);
router.delete("/:id", searchNotebookController.removeById);

module.exports = router;
