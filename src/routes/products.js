const { Router } = require("express");
const {
  getAllProducts,
  postProduct,
  filterProducts,
  filterByCategory,
  filterById,
  filterByType,
} = require("../controllers/products");
const router = Router();

router.get("/", getAllProducts);
router.post("/", postProduct);
router.get("/filter", filterProducts);
router.get("/:category", filterByCategory);
router.get("/:type", filterByType);
router.get("/filter/:id", filterById);

module.exports = router;
