import inquirer from "inquirer";
import { OpenAI } from "langchain/llms/openai";

require("dotenv").config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
});


const promptFunction = async (prompt: string) => {
    try {
        const res = await model.call(prompt)

        console.log(res)
    }
    catch (err){
        console.error(err)
    }
}

const init = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "prompt",
            message: "Please input a question:"
        }
    ]).then( data => {
        promptFunction(data.prompt)
    })
}

init()