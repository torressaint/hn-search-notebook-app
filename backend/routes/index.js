const router = require("express").Router();

router.use("/searchresult", require("./searchresult-routes"));
router.use("/searchnotebook", require("./searchnotebook-routes"));
router.use("/searchquery", require("./searchquery-routes"));
router.use("/statistics", require("./statistics-routes"));

module.exports = router;
