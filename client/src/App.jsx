import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Project from './Components/Projects/Project';
import AddProject from './Components/Projects/AddProject';
import EditProject from './Components/Projects/EditProject';
import Task from './Components/Tasks/Task';
import AddTask from './Components/Tasks/AddTask';
import EditTask from './Components/Tasks/EditTask';

import { UserProvider } from './ContextAPI/UserContext';
import './App.css';
import Profile from './Components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/tasks/add" element={<AddTask />} />
            <Route path="/tasks/:taskId/edit" element={<EditTask />} />
            <Route path="/project" element={<Project />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/edit-project/:projectId" element={<EditProject />} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
