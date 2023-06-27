const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const handelError = require('./middlewares/handelError');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

=======
const routes = require('./routes');

>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
<<<<<<< HEAD

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);
app.use(errors());
app.use(handelError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
=======
app.use((req, res, next) => {
  req.user = {
    _id: '64761b03448ca682a7383367',
  };

  next();
});

app.use(routes);

app.listen(3000, () => {
  console.log('App listening on port 3000');
>>>>>>> 21484be71502665d2f6e5493504c17a0bb766985
});
