const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const shoesRoute = require('./routes/shoes.js');
const uploadRoute = require('./routes/upload.js');

dotenv.config();

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('images'));

//ROUTES
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.use('/v1/shoes', shoesRoute);
app.use('/upload', uploadRoute);

app.get('/*', function (req, res) {
  res.sendFile(path.join('public', 'index.html'));
});
