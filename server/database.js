const { MongoClient } = require("mongodb");

let databaseConnection;

module.exports = {
  connectToDatabase: (callBack) => {
    MongoClient.connect(process.env.DATABASE_URI)
      .then((client) => {
        databaseConnection = client.db();
        console.log("Connected to database");
        return callBack();
      })
      .catch((err) => {
        console.error(err);
        return callBack(err);
      });
  },
  getDatabase: () => databaseConnection,
};
