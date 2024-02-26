const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const port = 5000;
const mysql = require("mysql");


app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));


// Use express-session middleware
app.use(
  session({
    secret: "REDDITCLONE1234", // 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

let con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: 3306,
  database: "reddit"
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL CONNECTED");
  }
});

global.db = con;

app.post("/register" , (req, res) => {
  const { Uname, email, password } = req.body;



  if (!Uname || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields." });
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const checkEmailQuery = 'SELECT COUNT(*) as count FROM users WHERE email = ? or username =?';
  const values = [email, Uname];

  db.query(checkEmailQuery, values, (err, results) => {
    if (err) {
      console.error("ERROR: ", err);
      return res.status(500).json({ message: 'An error occurred' });
    }

    const count = results[0].count;
    if (count > 0) {
      return res.status(409).json({ message: 'Email or Username already exists' });
    } else {
      const insertSql = 'INSERT INTO `users` (`username`, `email`, `password_hash`) VALUES (?, ?, ?)';
      db.query(insertSql, [Uname, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("ERROR: ", err);
          return res.status(500).json({ message: 'An error occurred during registration' });
        }
        req.session.user = { user: user.username, email: user.email }; 
        const sessionId = req.sessionID;
        console.log("Session ID:", sessionId);
        console.log("Session user:", req.session.user);
        res.status(201).json({
          msg: "User registered successfully",
          user: req.session.user,
          sessionId: sessionId
        });
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { Uname, password } = req.body;

  const selectUserQuery = "SELECT COUNT(*) as count, username, email, password_hash FROM users WHERE username = ?";
  const values = [Uname];

  db.query(selectUserQuery, values, (err, results) => {
    if (err) {
      console.error("ERROR: ", err);
      return res.status(500).json({ message: 'An error occurred' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid User or password' });
    }

    const user = results[0];

    console.log(user)

    if (user.count > 0) {
      const storedPassword = user.password_hash;
      const isPasswordValid = bcrypt.compareSync(password, storedPassword);

      if (isPasswordValid) {
        req.session.user = { user: user.username, email: user.email }; 
        const sessionId = req.sessionID;
        console.log("Session ID:", sessionId);
        console.log("Session user:", req.session.user);
        return res.status(200).json({
          msg: "Login successful",
          user: req.session.user,
          email: req.session.email,
          sessionId: sessionId 
        });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      return res.status(401).json({ message: 'No such Username found!' });
    } 
  });
});

app.get('/api/fetch-posts', async (req, res) => {
  try {
    const apiUrl = 'https://www.reddit.com/.json'; 
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});



app.get('/check-auth', (req, res) => {
  if (req.session && req.session.user) {

    res.status(200).json({ message: "Authenticated", user: req.session.user });
  } else {
    
    res.status(401).json({ message: "Not authorized to access this page!" });
  }
});



app.get('/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "Error logging out" });
      } else {
        res.status(200).json({ message: "Logged out successfully" });
      }
    });
  } else {
    res.status(401).json({ message: "You were not logged in" });
  }
});






 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
