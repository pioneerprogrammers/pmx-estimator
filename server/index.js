// require express, cors, body-parser
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


// require openai
const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: process.env.api_key,
})

const openai = new OpenAIApi(config);


// declare app and port
const app = express();
const port = process.env.PORT || 5000;


// use middleware
app.use(cors());
app.use(bodyParser.json());


// chatgpt api endpoint

app.post('/chat', async (req, res) => {

    const { prompt } = req.body;

    // console.log(prompt);

    const completion = await openai.createCompletion({

        model: "text-davinci-003",
        max_tokens: 1024,
        temperature: 0,
        prompt: prompt,

    })
    res.json({ response: completion.data.choices[0].text });
});


// check server root api
app.get('/', (req, res) => {
    res.send('Construction page is ready to build your sweet home')
});



// listening port
app.listen(port, () => {
    console.log('Constructor is listening', port);
})