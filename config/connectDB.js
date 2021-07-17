const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  try {
    const mongocon = await mongoose.createConnection(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MONGODB CONNECTED ! ${mongocon}`);
  } catch (err) {
    console.error(`Error: ${err} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
};

module.exports = {
  connectMongo,
};
