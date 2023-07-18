const { connection } = require("./db");

connection
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
    connection.close();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
