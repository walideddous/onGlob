const mongoose = require('mongoose');

const connectDBTest = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDBTest;
