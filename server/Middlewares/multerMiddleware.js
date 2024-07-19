const multer = require('multer'); // Import the multer library for handling file uploads

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Define the destination directory for storing uploaded files
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        // Define the filename for the uploaded file
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    },
});

// Define a function for filtering uploaded files based on their MIME types
const fileFilter = (req, file, callback) => {
    // Check if the file MIME type is one of the accepted image types (png, jpeg, jpg)
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true); // Allow the file to be uploaded
    } else {
        callback(null, false); // Reject the file upload
        // Return an error message if the uploaded file does not have an accepted MIME type
        return callback(new Error("Please upload following image extensions(png, jpeg, jpg) only"));
    }
};

// Configure multer with the defined storage and file filter options
const multerConfig = multer({
    storage, // Use the defined storage for storing uploaded files
    fileFilter, // Use the defined file filter for filtering uploaded files
});

module.exports = multerConfig; // Export the multer configuration to be used in other parts of the application
