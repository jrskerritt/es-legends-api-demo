const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const apiHandler = require('./handlers/apiHandler');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

// ES Legends api proxy
app.get('/api/cards', apiHandler);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
