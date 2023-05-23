const { Users } = require("../db");

const populateUser = async () => {
  const user = {
    name: "Santiago",
    lastName: "Calabró",
    email: "santi.calabro93@gmail.com",
    isAdmin: true,
  };
  await Users.create(user);
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).send(users);
  } catch (e) {
    res.status(404).send(e);
  }
};

const postUser = async (req, res) => {
  const { name, lastName, email } = req.body;
  try {
    if ((name, lastName, email)) {
      const user = await Users.create({
        name,
        lastName,
        email,
      });
      res.status(200).send(user);
    } else {
      res.status(404).json({ error: "Data is missing" });
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = {
  postUser,
  populateUser,
  getUsers,
};
