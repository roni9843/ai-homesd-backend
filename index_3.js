const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) cb(null, true);
        else cb(new Error("Only images are allowed"));
    },
}).single("image");

app.use("/uploads", express.static(uploadDir));

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        res.json({ imageUrl: `https://backend.aihomesd.com/uploads/${req.file.filename}` });
    });
});

app.listen(8000, () => console.log("Server running at 8000"));