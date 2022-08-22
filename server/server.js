const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3084;
const clientPort = 3000;
global.__basedir = __dirname; //base directory
var corsOptions = {
  'origin': `http://localhost:${clientPort}`
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//declaire db models
const db = require('./models');
db.sequelize.sync();


//test connection
app.get('/', (req, res) => {
  res.json({
    message: 'Test success!'
  })
});

//routes
require('./routes/categories.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
