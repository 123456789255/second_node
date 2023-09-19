const express = require('express');
const app = express();
const routes = require('./controllers/routes');
const db = require('./models/db');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
