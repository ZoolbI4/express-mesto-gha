const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64761b03448ca682a7383367',
  };

  next();
});

app.use(routes);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
