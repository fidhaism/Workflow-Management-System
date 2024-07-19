//index.js
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

// Import Routes
const registerRoutes = require('./Routes/registerRoutes');
const loginRoutes = require('./Routes/loginRoutes'); 
const projectRoutes = require('./Routes/projectsRoutes')
const statsRoutes = require('./Routes/statsRoutes')
const tasksRoutes = require('./Routes/tasksRoutes')
const usersRoutes = require('./Routes/usersRoutes')
const managersRoutes = require('./Routes/managersRoutes')
const profileRoutes = require('./Routes/profileRoutes')


// Middleware
app.use(cors()); // Use cors middleware to enable CORS
app.use(express.json());

// Use registerRoutes
app.use('/register', registerRoutes);

// Use loginRoutes
app.use('/', loginRoutes);

// Use projectRoutes
app.use('/projects', projectRoutes);

// Use statsRoutes
app.use('/stats', statsRoutes);

// Use tasksRoutes
app.use('/tasks', tasksRoutes);

// Use usersRoutes
app.use('/users', usersRoutes);

// Use managersRoutes
app.use('/api', managersRoutes);

//Use profileRoutes
app.use('/profile', profileRoutes);

// use to export images from backend
app.use('/uploads', express.static('./uploads'))

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Workflow Application Server is running on port ${PORT}`);
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('Hello World, This is Workflow Server Application')
})