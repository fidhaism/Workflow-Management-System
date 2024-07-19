// DeleteProject.js
import React from 'react';
import { DialogContent, DialogActions, Button } from '@mui/material';

const DeleteProject = ({ handleClose, handleDeleteProject }) => {
  return (
    <>
      <DialogContent>
        {/* Confirmation message */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteProject} color="primary">
          Delete
        </Button>
      </DialogActions>
    </>
  );
};

export default DeleteProject;
