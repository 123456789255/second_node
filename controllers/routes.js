const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const db = require('../models/db');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', urlencodedParser, async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length > 0) {
      res.redirect(`/profile/${rows[0].id}`);
    } else {
      res.send('Неверный email или пароль');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }

});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', urlencodedParser, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const [result] = await db.execute('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password]);


    res.redirect(`/profile/${result.insertId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }

});

router.get('/profile/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);

    if (rows.length > 0) {
      res.render('profile', { user: rows[0] });
    } else {
      res.send('Пользователь не найден');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }

});

module.exports = router;
