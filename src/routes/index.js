const { Router } = require("express");
const product = require("./products.js");
const users = require("./users.js");
const populate = require("./populate.js");

const router = Router();
router.use("/products", product);
router.use("/user", users);
router.use("/populatedb", populate);
router.use("/", (req, res) => {
  res.send("Hola mundo");
});

module.exports = router;
