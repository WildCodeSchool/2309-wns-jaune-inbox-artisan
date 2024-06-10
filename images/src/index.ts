import express, { Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 8000;
app.use(cors());

app.get('/', (_, res) => {
	res.send('Hello World!');
});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req: any, res: Response) => {
	console.log(req.file);
	fs.readFile(req.file.path, (err) => {
		if (err) {
			console.error('Error: ', err);
			res.status(500).json({ error: err });
		} else {
			res
				.status(201)
				.json({ status: 'success', filename: '/files/' + req.file.filename });
		}
	});
});

app.get('/files/:filename', (req, res) => {
	let file = path.join(__dirname + '/../uploads', req.params.filename);
	fs.readFile(file, (err, content) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text' });
			res.write('File Not Found!');
			res.end();
		} else {
			res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
			res.write(content);
			res.end();
		}
	});
});

app.delete('/files/:filename', (req, res) => {
	const filename = req.params.filename.split('/').reverse()[0];
	let file = path.join(__dirname + '/../uploads/', filename);
	fs.rm(file, (err) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text' });
			res.write('File Not Found!');
			res.end();
		} else {
			res.status(201).send({ status: 'success' });
		}
	});
});

app.listen(port, () => {
	console.info(`Service d'image écoute sur : ${port}`);
});
