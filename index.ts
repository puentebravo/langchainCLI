import inquirer from "inquirer";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

require("dotenv").config();

interface inquirerResult {
  prompt: string
}
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  workout: "Individual exercises for the workout",
  length: "the length in minutes of the workout",
  summary: "detailed directions on how to execute each exercise",
});

const formatInstructions = parser.getFormatInstructions();

const promptFunction = async (input: string) => {
  try {
    const prompt = new PromptTemplate({
      template:
        "You are a fitness expert. Please give the user a workout of the length they specify. \n{format_instructions}  \n {time}",
      inputVariables: ["time"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const promptInput = await prompt.format({
      time: input,
    });

    const res = await model.call(promptInput);

    const parsedRes = await parser.parse(res)

    console.log(parsedRes);
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
        message: "How much time do you have for a workout?",
      },
    ])
    .then((data: inquirerResult) => {
      promptFunction(data.prompt);
    });
};

init();
