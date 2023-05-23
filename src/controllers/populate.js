const { Products } = require("../db");
const { populateProducts } = require("./products");
const { populateUser } = require("./users");

const populateDB = async (req, res) => {
  try {
    const count = await Products.count();
    if (!count) {
      await populateUser();
      await populateProducts();
      res.status(200).send("Database populated!");
    } else {
      res.status(300).send("Database already populated!");
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = {
  populateDB,
};
