const express = require('express');
const path = require('path');
const app = express();
const PORT = 5555;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(PORT);