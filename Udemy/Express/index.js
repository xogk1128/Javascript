const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/cats', (req, res) => {
    res.send('MEOW!!');
});

app.get('/dogs', (req, res) => {
    res.send('WOOF!!');
});

app.get('/r/:subReddit', (req, res) => {
    const {subReddit} = req.params;
    res.send(`<h1>Browsing the ${subReddit} subreddit</h1>`);
});

app.get('/r/:subReddit/:postId', (req, res) => {
    const {subReddit, postId} = req.params;
    res.send(`<h1>Viewing Post ID : ${postId} on the ${subReddit} subreddit</h1>`);
});

app.get('/search', (req, res) => {
    const {q, hi} = req.query;
    res.send(`<h1>Search results for : ${q} & ${hi}</h1>`);
});

app.get('*', (req, res) => {
    res.send("I dont't know the path!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})