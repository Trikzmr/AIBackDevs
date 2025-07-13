async function crudOperation(operation, Model, key, data) {
  switch (operation) {
    case "create":
      return await Model.create(data);
    case "read":
      return await Model.find(key);
    case "update":
      return await Model.updateMany(key, data);
    case "delete":
      return await Model.deleteMany(key);
    default:
      throw new Error("Unsupported operation");
  }
}

module.exports = crudOperation;
