const { conn } = require("../db");
const { Products, Users } = require("../db");
const allProducts = require("../json/allproducts.json");
const populateProducts = async () => {
  for (let i = 0; i < allProducts.length; i++) {
    await Products.create({
      name: allProducts[i].name,
      image: allProducts[i].image,
      principle: allProducts[i].principle,
      category: allProducts[i].category,
      type: allProducts[i].type,
      presentation: allProducts[i].presentation,
      crop: allProducts[i].crop,
      userId: 1,
    });
  }
};
const filterProducts = async (req, res) => {
  const { search, type } = req.query;

  let sqlQuery = `SELECT * FROM products WHERE name LIKE '%${search}%' OR principle LIKE '%${search}%' OR type LIKE '%${search}%' OR category LIKE '%${search}%'`;
  let typeQuery = `SELECT * FROM products WHERE type =${type}`;
  try {
    if (search) {
      const products = await conn.query(sqlQuery, {
        model: Products,
        mapToModel: true,
      });
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json("No products found");
      }
    }
    if (type) {
      const products = await conn.query(typeQuery, {
        model: Products,
        mapToModel: true,
      });
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json("No products found");
      }
    }
  } catch (e) {
    res.status(404).json(e);
  }
};

const filterById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByPk(id);
    const productId = {
      name: product.name,
      image: product.image,
      principle: product.principle,
      category: product.category,
      type: product.type,
      presentation: product.presentation,
      crop: product.crop,
    };

    res.status(200).send(productId);
  } catch (e) {
    res.status(404).send(e);
  }
};

const filterByType = async (req, res) => {
  const { type } = req.params;
  let sqlQuery = `SELECT * FROM products WHERE type = '${type}'`;
  try {
    const products = await conn.query(sqlQuery, {
      model: Products,
      mapToModel: true,
    });
    res.status(200).send(products);
  } catch (e) {
    res.status(404).send(e);
  }
};

const filterByCategory = async (req, res) => {
  const { category } = req.params;
  const { search } = req.query;
  let sqlQuery = `SELECT * FROM products WHERE category = '${category}'`;
  let sqlSearch = `SELECT * FROM products WHERE category = '${category}' AND name LIKE '%${search}%' OR principle LIKE '%${search}%' OR type LIKE '%${search}%'`;
  try {
    if (!search) {
      const products = await conn.query(sqlQuery, {
        model: Products,
        mapToModel: true,
      });
      res.status(200).send(products);
    } else {
      const products = await conn.query(sqlSearch, {
        model: Products,
        mapToModel: true,
      });
      res.status(200).send(products);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const prod = await Products.findAll({
      include: [{ model: Users, attributes: ["email"] }],
    });
    res.status(200).json(prod);
  } catch (e) {
    res.status(404).send(e);
  }
};

const postProduct = async (req, res) => {
  const { name, image, principle, category, type, presentation, crop, userId } =
    req.body;
  try {
    if (
      name &&
      image &&
      principle &&
      category &&
      type &&
      presentation &&
      userId
    ) {
      const product = await Products.create({
        name,
        image,
        principle,
        category,
        type,
        presentation,
        crop,
        userId,
      });
      res.status(200).send(product);
    } else {
      res.status(404).json({ error: "Data is missing" });
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = {
  getAllProducts,
  postProduct,
  populateProducts,
  filterProducts,
  filterByCategory,
  filterById,
  filterByType,
};
