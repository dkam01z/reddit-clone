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

app.use(
  session({
    secret: "REDDITCLONE1234",
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

app.post("/register", (req, res) => {
  const { Uname, email, password } = req.body;

  if (!Uname || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields." });
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const checkEmailQuery = 'SELECT COUNT(*) as count FROM users WHERE email = ? OR username = ?';
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

        const userId = result.insertId;
        const getUserSql = 'SELECT `user_id`, `username`, `email` FROM `users` WHERE `user_id` = ?';
        db.query(getUserSql, [userId], (err, userResults) => {
          if (err) {
            console.error("ERROR: ", err);
            return res.status(500).json({ message: 'An error occurred during retrieval of user data' });
          }

          const user = userResults[0];
          req.session.user = { user_id: user.user_id, user: user.username, email: user.email };
          const sessionId = req.sessionID;
          console.log("Session ID:", sessionId);
          console.log("Session user:", req.session.user);
 
          res.status(201).json({
            msg: "User registered successfully",
            user: req.session.user,
            sessionId: sessionId
          });
        }); 
      }); 
    }
  });
});

app.get('/fetchComments', (req, res) => {
  const postId = req.query.postId;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  const fetchCommentsQuery = `
    SELECT 
      c.comment_id AS id,
      u.username AS author,
      c.content,
      c.created_at as time,
      c.parent_id,
      c.depth
    FROM comments c
    JOIN users u ON c.user_id = u.user_id
    WHERE c.post_id = ?
    ORDER BY c.created_at ASC;
  `;
  
  db.query(fetchCommentsQuery, [postId], (err, results) => {
    if (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ message: 'Error fetching comments' });
    } else {
      console.log(results)
      res.json(results);
    }
  });
});

app.post('/submitComment', async (req, res) => {
  const { postId, content } = req.body;
  const userId = req.session.user.user_id;

  if (!postId || !content || !userId) {
    return res.status(400).json({ message: 'Missing required data' });
  }

  const query = "INSERT INTO comments (post_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())";
  const values = [postId, userId, content];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error submitting comment:', err);
      return res.status(500).json({ message: 'Database error while submitting comment' });
    }

    res.json({ message: 'Comment submitted successfully', commentId: result.insertId });
  });
});


app.post("/login", (req, res) => {
  const { Uname, password } = req.body;

  const selectUserQuery = "SELECT COUNT(*) as count, user_id, username, email, password_hash FROM users WHERE username = ?";
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

    console.log(user);

    if (user.count > 0) {
      const storedPassword = user.password_hash;
      const isPasswordValid = bcrypt.compareSync(password, storedPassword);

      if (isPasswordValid) {
        req.session.user = { user_id: user.user_id, user: user.username, email: user.email };
        const sessionId = req.sessionID;
        console.log("Session ID:", sessionId);
        console.log("Session user:", req.session.user);
        return res.status(200).json({
          msg: "Login successful",
          id: user.user_id,
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

app.get('/fetchPosts', (req, res) => {
  const fetchPostsQuery = `
    SELECT 
      p.post_id AS id,
      u.username AS author,
      p.created_at as time,
      p.title,
      p.content,
      COUNT(DISTINCT c.comment_id) AS comments,
      COALESCE(SUM(CASE WHEN v.vote_type = 1 THEN 1 WHEN v.vote_type = -1 THEN -1 ELSE 0 END), 0) AS votes
    FROM posts p
    JOIN users u ON p.user_id = u.user_id
    LEFT JOIN comments c ON p.post_id = c.post_id
    LEFT JOIN votes v ON p.post_id = v.post_id
    GROUP BY p.post_id
    ORDER BY p.created_at DESC;
  `;
  
  db.query(fetchPostsQuery, (err, results) => {
    if (err) {
      console.error("ERROR: ", err);
      res.status(500).json({ message: 'Error fetching posts' });
    } else {
      res.json(results);
    }
  });
});



app.post('/updateCounter', (req, res) => {
  const { newCount, postId, user_id } = req.body;

  if (!postId || newCount === undefined || !user_id) {
    return res.status(400).json({ message: 'Missing required data to update count' });
  }

  const query = `
    INSERT INTO votes (post_id, user_id, vote_type)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE vote_type = VALUES(vote_type);
  `;

  const values = [postId, user_id, newCount];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating count:', err);
      return res.status(500).json({ message: 'Database error while updating count' });
    }

    res.json({ message: 'Count updated successfully', newCount });
  });
});

app.post('/submitPost', async (req, res) => {
  const { type, dataToSubmit } = req.body;

  if (!type || !dataToSubmit) {
    return res.status(400).json({ message: 'Request is missing type or dataToSubmit' });
  }

  const userId = req.session.user.user_id;

  try {
    let query = "";
    let values = [];

    switch (type) {
      case 'Post':
        query = "INSERT INTO posts (user_id, title, content, community, category) VALUES (?, ?, ?, ?, ?)";
        values = [userId, dataToSubmit.title, dataToSubmit.description, dataToSubmit.community, dataToSubmit.selectedCategories.join(',')];
        break;
      case 'Image':
        query = "INSERT INTO posts (image, content, user_id) VALUES (?, ?, ?)";
        values = [dataToSubmit.imageUrl, dataToSubmit.description, userId];
        break;
      case 'Link':
        query = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
        values = [dataToSubmit.title, dataToSubmit.description, userId];
        break;
      default:
        return res.status(400).json({ message: 'Invalid post type' });
    }

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("ERROR: ", err);
        return res.status(500).json({ message: 'Error submitting post' });
      }
      res.json({ success: true, message: 'Post submitted successfully', postId: results.insertId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});



app.get('/check-auth', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ message: "Authenticated", user: req.session.user });
  } else {
    res.status(401).json({ message: "Not authorized to access this page!" });
  }
});

app.get('/getUserVotes', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const query = `
    SELECT post_id, vote_type
    FROM votes
    WHERE user_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user votes:', err);
      return res.status(500).json({ message: 'Database error while fetching user votes' });
    }

    const userVotes = results.reduce((acc, vote) => {
      acc[vote.post_id] = vote.vote_type;
      return acc;
    }, {});

    res.json(userVotes);
  });
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
