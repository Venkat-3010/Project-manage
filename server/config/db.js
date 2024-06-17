const mongose = require("mongoose");

const connect = async () => {
  try {
    await mongose.connect(process.env.MongoDB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connect;
