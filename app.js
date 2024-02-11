const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

app.get('/', (req, res) => {
  res.send(`<h1>Home.<h1>`);
})