import {Configuration, OpenAIApi} from "openai";
import {writeFileSync, createReadStream} from "fs";
import {config} from "dotenv";

config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const src = "./img/import/YOUR_FILE.png";
const mask = "./img/import/YOUR_MASKED_FILE.png";

const result = await openai.createImageEdit(
    createReadStream(src),
    createReadStream(mask),
    "YOUR PROMPT HERE",
    1,
    "1024x1024"
);


const url = result.data.data[0].url;
console.log(url);


const imgResult = await fetch(url);

const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./img/edit/${Date.now()}.png`, buffer);
