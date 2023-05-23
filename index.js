// const server = require("./src/App.js");
const { conn } = require("./src/db.js");

import server from "./src/app.js";
// import { conn } from "./src/db.js";

// const server = require("./src/app.js");
// const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
