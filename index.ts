import inquirer from "inquirer";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

require("dotenv").config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
});

const promptFunction = async (input: string) => {
  try {

    const prompt = new PromptTemplate({
        template: "As a JavaScript expert, please answer the user's coding questions as thoroughly as possible. \n {question}",
        inputVariables: ["question"]
    })

    const promptInput = await prompt.format({
        question: input
    })

    const res = await model.call(promptInput);

    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

const init = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "prompt",
        message: "Please input a question:",
      },
    ])
    .then((data) => {
      promptFunction(data.prompt);
    });
};

init();
