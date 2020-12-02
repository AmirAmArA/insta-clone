const express = require('express');
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');
const bcrypt = require('bcrypt');
const app = express();

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  console.log('====================================');
  console.log("connected to MONGODB");
  console.log('====================================');
});
mongoose.connection.on('error', (err) => {
  console.log('====================================');
  console.log(`error with connection to MONGODB err : ${err}`);
  console.log('====================================');
});

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

