"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.get("/", (_, res) => {
    res.send("Hello World!");
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../uploads/"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    fs_1.default.readFile(req.file.path, (err) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).json({ error: err });
        }
        else {
            res
                .status(201)
                .json({ status: "success", filename: "/files/" + req.file.filename });
        }
    });
});
app.get("/files/:filename", (req, res) => {
    let file = path_1.default.join(__dirname + "/../uploads", req.params.filename);
    console.log("file", file);
    fs_1.default.readFile(file, (err, content) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text" });
            res.write("File Not Found!");
            res.end();
        }
        else {
            res.writeHead(200, { "Content-Type": "application/octet-stream" });
            res.write(content);
            res.end();
        }
    });
});
app.listen(port, () => {
    console.log(`Service d'image écoute sur : ${port}`);
});
