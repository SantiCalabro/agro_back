const { Router } = require("express");
const { postUser } = require("../controllers/users");
const router = Router();

// router.get("/", getAllProducts);
router.post("/", postUser);

module.exports = router;
