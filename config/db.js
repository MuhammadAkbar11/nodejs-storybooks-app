const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`\nMongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log(`\nError : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
