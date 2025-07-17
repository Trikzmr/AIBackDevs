const mongoose = require("mongoose");

async function connectToDatabase(uri) {
  try {
    // If already connected or connecting, disconnect first
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      await mongoose.disconnect();
      console.log("⚠️ Previous MongoDB connection closed.");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
}

module.exports = connectToDatabase;
