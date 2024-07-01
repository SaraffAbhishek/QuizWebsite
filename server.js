const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root path route
app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'public/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error loading index.html');
    } else {
      res.send(data);
    }
  });
});


app.get('/login', (req, res) => {
  // Handle login page rendering or redirection logic here
  res.sendFile(path.join(__dirname, 'public/index.html')); // Example: Sending a login page
});



app.get('/createQuiz', (req, res) => {
  // Handle login page rendering or redirection logic here
  res.sendFile(path.join(__dirname, 'public/createQuiz.html')); // Example: Sending a login page
});




app.post('/createQuiz', (req, res) => {
  const { quizTitle, quizSubject } = req.body;
  
  if (!quizTitle || !quizSubject) {
      return res.status(400).send('Quiz title and subject are required.');
  }
  
  connection.query('INSERT INTO QUIZS (title, subject) VALUES (?, ?)', [quizTitle, quizSubject], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error creating quiz.');
      }
      console.log('Quiz created successfully!');
      res.json({ insertId: result.insertId }); // Sending the insert ID as JSON response
  });
});



app.get('/addQuestion/:quizId', (req, res) => {
  // Handle login page rendering or redirection logic here
  const quizId = req.params.quizId;
  res.sendFile(path.join(__dirname, 'public/addQuestion.html')); // Example: Sending a login page
});

app.post('/addQuestion', (req, res) => {
  const { questionText, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

  const quizId = req.body.quizId;
  
  // Save question and options to the database
  connection.query('INSERT INTO mcq_questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)', [quizId, questionText, optionA, optionB, optionC, optionD, correctAnswer], (err, result) => {
      if (err) throw err;
      console.log('Question added successfully!');
      res.redirect(`/addQuestion/${quizId}`);
  });
});



app.get('/quiz', (req, res) => {
  // Handle login page rendering or redirection logic here
  res.sendFile(path.join(__dirname, 'public/quiz.html')); // Example: Sending a login page
});

app.get('/attendance', (req, res) => {
  // Handle login page rendering or redirection logic here
  res.sendFile(path.join(__dirname, 'public/attendance.html')); // Example: Sending a login page
});

app.get('/cie', (req, res) => {
  // Handle login page rendering or redirection logic here
  res.sendFile(path.join(__dirname, 'public/cie.html')); // Example: Sending a login page
});

app.get('/login-teacher', (req, res) => {
  // Handle login page rendering or redirection logic here
  res.sendFile(path.join(__dirname, 'public/teacher-login.html')); // Example: Sending a login page
});

app.get('/login-admin', (req, res) => {
  // Handle login page rendering or redirection logic here
  res.sendFile(path.join(__dirname, 'public/admin-login.html')); // Example: Sending a login page
});

// Sign-up route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Invalid username, email, or password. Please provide all required fields.' });
  }

  const userQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  connection.query(userQuery, [username, email], async (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(insertQuery, [username, email, hashedPassword], (err, result) => {
      if (err) throw err;

      res.json({ message: 'Sign-up successful' });
    });
  });
});


app.post('/signup-teacher', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      return res.status(400).json({ error: 'Invalid username, email, or password. Please provide all required fields.' });
  }

  const checkTeacherQuery = 'SELECT * FROM teacher_emails WHERE email = ?';
  connection.query(checkTeacherQuery, [email], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
          return res.status(403).json({ error: 'Email is not permitted for teacher signup' });
      }

      const userQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
      connection.query(userQuery, [username, email], async (err, results) => {
          if (err) throw err;

          if (results.length > 0) {
              return res.status(400).json({ error: 'Username or email already exists' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
          connection.query(insertQuery, [username, email, hashedPassword], (err, result) => {
              if (err) throw err;

              res.json({ message: 'Sign-up successful' });
          });
      });
  });
});

app.post('/signup-admin', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      return res.status(400).json({ error: 'Invalid username, email, or password. Please provide all required fields.' });
  }

  const checkTeacherQuery = 'SELECT * FROM admin_emails WHERE email = ?';
  connection.query(checkTeacherQuery, [email], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
          return res.status(403).json({ error: 'Email is not permitted for admin signup' });
      }

      const userQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
      connection.query(userQuery, [username, email], async (err, results) => {
          if (err) throw err;

          if (results.length > 0) {
              return res.status(400).json({ error: 'Username or email already exists' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
          connection.query(insertQuery, [username, email, hashedPassword], (err, result) => {
              if (err) throw err;

              res.json({ message: 'Sign-up successful' });
          });
      });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid username or password. Please provide both fields.' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], async (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  });
});

app.post('/login-teacher', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ error: 'Invalid username or password. Please provide both fields.' });
  }

  const checkTeacherQuery = 'SELECT * FROM teacher_emails WHERE email = (SELECT email FROM users WHERE username = ?)';
  connection.query(checkTeacherQuery, [username], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
          return res.status(403).json({ error: 'Unauthorized access. Only teachers can log in.' });
      }

      const query = 'SELECT * FROM users WHERE username = ?';
      connection.query(query, [username], async (err, results) => {
          if (err) throw err;

          if (results.length === 0) {
              return res.status(401).json({ error: 'Invalid username or password' });
          }

          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
              return res.status(401).json({ error: 'Invalid username or password' });
          }

          res.json({ message: 'Login successful' });
      });
  });
});

app.post('/login-admin', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ error: 'Invalid username or password. Please provide both fields.' });
  }

  const checkTeacherQuery = 'SELECT * FROM admin_emails WHERE email = (SELECT email FROM users WHERE username = ?)';
  connection.query(checkTeacherQuery, [username], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
          return res.status(403).json({ error: 'Unauthorized access. Only admins can log in.' });
      }

      const query = 'SELECT * FROM users WHERE username = ?';
      connection.query(query, [username], async (err, results) => {
          if (err) throw err;

          if (results.length === 0) {
              return res.status(401).json({ error: 'Invalid username or password' });
          }

          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
              return res.status(401).json({ error: 'Invalid username or password' });
          }

          res.json({ message: 'Login successful' });
      });
  });
});

app.get('/admin-styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-styles.css'), {
      headers: {
          'Content-Type': 'text/css'
      }
  });
});

app.get('/admin-dashboard.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.js'), {
      headers: {
        'Content-Type': 'application/javascript'
      }
  });
});

app.get('/styles2.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'styles2.css'), {
      headers: {
          'Content-Type': 'text/css'
      }
  });
});

app.get('/script2.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'script2.js'), {
      headers: {
        'Content-Type': 'application/javascript'
      }
  });
});

app.get('/quiz-styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz-styles.css'), {
      headers: {
          'Content-Type': 'text/css'
      }
  });
});

app.get('/quiz.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz.js'), {
      headers: {
        'Content-Type': 'application/javascript'
      }
  });
});

app.get('/get-all-users', (req, res) => {
  // Query to select all users from the users table
  const query = 'SELECT * FROM users';

  // Execute the query to fetch all user details
  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching user details:', err);
          res.status(500).json({ error: 'Failed to fetch user details' });
      } else {
          res.status(200).json(results); // Send the user details as JSON response
      }
  });
});


app.post('/add-teacher-email', (req, res) => {
  const { email } = req.body;

  // Insert email into the teacher_emails table
  const query = 'INSERT INTO teacher_emails (email) VALUES (?)';
  connection.query(query, [email], (err, result) => {
      if (err) {
          console.error('Error adding teacher email:', err);
          res.status(500).json({ error: 'Failed to add teacher email' });
      } else {
          console.log('Teacher email added successfully');
          res.status(200).json({ message: 'Teacher email added successfully' });
      }
  });
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/dashboard.html'));
});

app.get('/dashboard-teacher', (req, res) => {
  res.sendFile(path.join(__dirname, '/dashboard2.html'));
});

app.get('/dashboard-admin', (req, res) => {
  res.sendFile(path.join(__dirname, '/dashboard3.html'));
});




app.listen(3000, () => {
  console.log('Server started on port 3000');
});