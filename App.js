const express = require("express");
const promptIdentifier = require("./Modles/PromptIdentifier.js");
const connectToDatabase = require("./Controllers/conn.js");
const createDynamicModel = require("./Controllers/dynamicModel.js")
const crudOperation = require("./Controllers/crudController.js")

const {setBasic, basic} = require("./Data/Config.js");

const app  = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function testing(prompt){
    const configdata = await promptIdentifier(prompt);
    setBasic(configdata);
    const Model = createDynamicModel(configdata.schemaName, configdata.schemaStructure);
    await connectToDatabase(basic.MongoDbURI);
    const result = await crudOperation(configdata.operation, Model, configdata.key, configdata.data);
    console.log(result)
    return result;
}

app.get("", async(req, res)=>{
    res.send("hello")
})


app.post("/aibackend",async (req, res)=>{
    const {instructions, uri, Schemaname} = req.body
    const prompt = {
        instructions: instructions,
        MongoDbUri: uri,
        Schemaname: Schemaname,
    }
    const data = await testing(prompt)
    res.json(data);
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

