const express = require('express');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const tokenValidator = require('../middlewares/tokenValidator');

require('dotenv').config();

app = express();

app.use((req, res, next) => {
  console.log(`Requesting for ${req.method} ${req.path}`)
  next();
})

app.use(
  expressjwt({ secret: process.env.SECRET_KEY })
    .unless({
      path: [
        '/api/login'
      ]
    }));

app.get('/api', tokenValidator, (req, res) => {
  res.json({
    message: 'Welcome to API of MyApp'
  })
});

app.get('/api/posts', tokenValidator, (req, res) => {
  res.json({
    posts: []
  })
});

app.get('/api/user', tokenValidator, (req, res) => {
  res.json({
    auth: req.user
  })
})

app.post('/api/login', (req, res) => {
  console.log(req.headers)
  // Mock user
  const user = {
    id: 1, 
    username: 'brian',
    email: 'brian@gmail.com'
  }
  const settings = {
    lang: 'en'
  }

  jwt.sign({user, settings}, process.env.SECRET_KEY, { expiresIn: '120s' }, (err, token) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json({ token });
    }
  });
});

app.listen(7000, () => console.log('Server started at http://localhost:7000'));