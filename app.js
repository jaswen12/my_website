const { Console } = require('console');
const express = require('express');
const path = require('path');
const fs = require('fs'); // file system module
const app = express();

// Set view engine to Pug (used to render HTML templates)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/projects', (req, res) => {
  const filePath = path.join(__dirname, 'projects.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to load project data:', err);
      return res.status(500).send('Error loading projects.');
    }

    const projects = JSON.parse(data); // Convert JSON string to JS object
    res.render('projects', { title: 'Projects', projects }); // Pass to Pug
  });
});

app.get('/resume', (req, res) => {
  res.render('resume', { title: 'Resume' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Submission Received:', { name, email, message });
  res.send(`<h1>Thanks, ${name}!</h1><p>Message Received!.</p><a href="/">Back to Home</a>`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
