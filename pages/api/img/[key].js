import fs from 'fs';
import path from 'path';
import { images } from '../../../src/model/ImageModel';



const IMAGE_DIR = path.resolve('.', 'src/image');


export default async function handler(req, res) {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress || '';
  const KEY = String(req.query.key || '');
  try {
    const image = images.find(img => img.key === KEY);

    if (image) {
      const buff = fs.ReadStream(`${IMAGE_DIR}/${image.name}.${image.type}`);

      if (buff) {
        res.setHeader('Content-Type', image.mimetype);
        res.status(200);
        res.send(buff);
        return;
      };
    };

    return res.status(404).json({ error: '404 | NOT FOUND' });
  } catch (error) {
    return res.status(500).json({ error: '500 | INTERNAL SERVER' });
  }
};