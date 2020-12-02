const express = require('express');
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');
const bcrypt = require('bcrypt');
const app = express();
require('./models/user')
app.use(express.json());
app.use(require('./routes/auth'))

const PORT = 5000;


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


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

