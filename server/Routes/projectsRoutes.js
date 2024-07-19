const express = require('express');
const router = express.Router();
const { Project } = require('../db'); // Import your Project model

// Route to get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add a new project
router.post('/', async (req, res) => {
  try {
    console.log('Creating new project:', req.body);
    // Create a new project using data from the request body
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject); // Respond with the created project
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get the last project ID
router.get('/lastId', async (req, res) => {
  try {
    const lastProject = await Project.findOne({}, {}, { sort: { 'project_id': -1 } });
    if (lastProject) {
      res.json({ lastProjectId: lastProject.project_id });
    } else {
      res.status(404).json({ message: 'No projects found' });
    }
  } catch (error) {
    console.error('Error getting last project ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a project by ID
router.delete("/:id", async (req, res) => {
  const projectId = req.params.id;
  try {
    // Find the project by ID and delete it
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get project by projectId
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update a project by ID
router.put('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;
