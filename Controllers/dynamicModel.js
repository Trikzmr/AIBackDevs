const mongoose = require("mongoose");

function createDynamicModel(name, structure) {
  const schemaFields = {};

  for (const key in structure) {
    schemaFields[key] = eval(structure[key]); // Careful: only from trusted source
  }

  const schema = new mongoose.Schema(schemaFields);

  return mongoose.models[name] || mongoose.model(name, schema);
}

module.exports = createDynamicModel;