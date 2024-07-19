const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/workflow_app');

// Get the default connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define project schema
const projectSchema = new mongoose.Schema({
  // Define fields for the project schema
  project_id: { type: String, required: true }, // Unique identifier for the project
  project_name: { type: String, required: true }, // Name of the project
  description: String, // Description of the project (optional)
  start_date: Date, // Start date of the project
  end_date: Date, // End date of the project
  status: { 
    type: String, 
    enum: ['Completed', 'In Progress', 'Pending'], // Enumerated values for project status
    default: 'Pending' // Default status if not specified
  },
  manager_id: String // Assuming manager_id is a reference to user id
});

// Automatically generate project_id before saving
projectSchema.pre('save', async function (next) {
  try {
    if (!this.project_id) {
      // Find the last project in the database to determine the next project_id
      const lastProject = await this.constructor.findOne({}, {}, { sort: { 'project_id': -1 } });
      if (lastProject) {
        // Extract the numeric part of the last project_id, increment it, and format it
        const lastId = parseInt(lastProject.project_id.substr(1));
        this.project_id = 'P' + (lastId + 1).toString().padStart(3, '0'); // Generate the next project_id
      } else {
        // If there are no existing projects, start with 'P001'
        this.project_id = 'P001';
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Define project model
const Project = mongoose.model('Project', projectSchema);

// Define user schema
const userSchema = new mongoose.Schema({
  // Define fields for the user schema
  name: { type: String, required: true }, // Name of the user
  email: { type: String, required: true }, // Email address of the user
  password: { type: String, required: true }, // Password of the user
  role: { 
    type: String, 
    enum: ['admin', 'employee', 'management'], // Enumerated values for user roles
    default: 'employee' // Default role if not specified
  }, 
  avatarUrl: { type: String }, // URL of the user's avatar (optional)
});

// Define user model
const User = mongoose.model('User', userSchema);

// Export User and Project models
module.exports = { User, Project };
