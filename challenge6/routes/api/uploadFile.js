import express from 'express';
const routerUpload = express.Router();
import upload from '../../middleware/uploadFile.js';

routerUpload.post('/', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('File not found');
    return next(error);
  }
  res.status(200).send(file);
});

export default routerUpload;
