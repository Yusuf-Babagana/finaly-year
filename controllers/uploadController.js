const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Set Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// File Upload Middleware
const upload = multer({ storage });

// Handle File Upload
exports.uploadFile = (req, res) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: "File upload failed", error: err.message });
        }
        res.json({ message: "File uploaded successfully", filename: req.file.filename });
    });
};

// Get List of Uploaded Files
exports.getFiles = (req, res) => {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.readdir(uploadPath, (err, files) => {
        if (err) return res.status(500).json({ message: "Error fetching files" });
        res.json(files);
    });
};

// Handle File Download
exports.downloadFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ message: "File not found" });
    }
};
