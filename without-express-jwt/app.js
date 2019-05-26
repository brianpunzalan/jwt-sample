const express = require('express');
const jwt = require('jsonwebtoken');
const tokenValidator = require('../middlewares/tokenValidator');

require('dotenv').config();

app = express();

app.get('/api', tokenValidator, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Welcome to the API of MyApp'
      })
    }
  })
});

app.get('/api/posts', tokenValidator, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        posts: []
      })
    }
  })
});

app.get('/api/user', tokenValidator, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        auth: user
      })
    }
  })
});

app.post('/api/login', (req, res) => {
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
      res.json({
        token
      });
    }
  });
});

app.listen(7000, () => console.log('Server started at http://localhost:7000'));