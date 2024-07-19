const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_id: {
    type: String,
    required: true,
    unique: true
  },
  // Add the image field
  image: {
    type: String, // Store the image URL
    required: true // Make it required if an image must be associated with every task
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'In Progress'
  }
});

// Populate project_id and assigned_user fields when querying tasks
taskSchema.pre(/^find/, function (next) {
  this.populate('project_id');
  next();
});

module.exports = mongoose.model('Task', taskSchema);
