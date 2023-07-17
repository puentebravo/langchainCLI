import Inquirer from "inquirer";
import { OpenAI } from "langchain";

require("dotenv").config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
});


const promptFunction = async () => {
    try {
        const res = await model.call("How do you capitalize all characters of a string in JavaScript?")

        console.log(res)
    }
    catch (err){
        console.error(err)
    }
}

promptFunction()