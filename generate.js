import {Configuration, OpenAIApi} from "openai";
import {writeFileSync} from "fs";
import {config} from "dotenv";

config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const prompt = "YOUR PROMPT HERE"

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: "USERNAME"
})

const url = result.data.data[0].url;
console.log(url);


const imgResult = await fetch(url);

const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./img/generate/${Date.now()}.png`, buffer);



