const mongoose = require("mongoose");

async function connectToDatabase(uri) {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("✅ Connected to MongoDB");
}

module.exports = connectToDatabase;