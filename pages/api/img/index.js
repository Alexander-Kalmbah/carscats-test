import fs from 'fs';
import path from 'path';


const IMAGE_DIR = path.resolve('.', 'src/image');

const IMAGE_404 = {
  filename: 'no-img.png',
  mimetype: 'image/png'
};

export default async function handler(req, res) {
  try {

    // if (req.method === 'GET') {
    //   const buff = fs.ReadStream(`${IMAGE_DIR}/${IMAGE_404.filename}`);

    //   res.status(404).setHeader('res-msg', 'IMAGE NOT FOUND');

    //   if (buff) {
    //     res.setHeader('Content-Type', IMAGE_404.mimetype);
    //     res.send(buff);
    //     return;
    //   };

    //   return res.json({ error: '404 | NOT FOUND' });
    // };

    return res.status(405).json({ error: '405 | METHOD NOT ALLOWED' });
  } catch (error) {
    return res.status(500).json({ error: '500 | INTERNAL SERVER' });
  }
};