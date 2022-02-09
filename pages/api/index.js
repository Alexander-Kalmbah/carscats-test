// import dbConnect from './../../src/lib/dbConnect';


export default async function handler(req, res) {
  try {
    // await dbConnect();


    return res.status(200).json({ time, keys });
  } catch (error) {
    return res.status(500).json({ error: '500 | INTERNAL SERVER' });
  }
};