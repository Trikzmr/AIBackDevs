require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const {Schema, systemInstruction} = require("../Data/PromptIdentifier")

const ai = new GoogleGenAI({});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
        {
            role: "user",
            parts: [
            {
                text: prompt.instructions + "\nMongo URI: " + prompt.MongoDbUri + "\nSchema Name: " + prompt.Schemaname
            }
            ]
        }
        ],
    config:{
        responseMimeType: "application/json",
        //responseSchema: Schema,
        systemInstruction: systemInstruction,
        maxOutputTokens: 5000,
        temperature: 1.5,
    }
  });
  //console.log(response.text);
    try {
    const parsed = JSON.parse(response.text);
    console.log("Parsed JSON:", parsed);
    return parsed; // return as actual JSON object
  } catch (err) {
    console.error("Failed to parse JSON from response:", err);
    return response.text; // fallback to raw text
  }
}
module.exports = main ;