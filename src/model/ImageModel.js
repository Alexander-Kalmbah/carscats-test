// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// const imgSchema = new Schema({
//   key: { type: String, required: true },
//   name: { type: String, required: true },
//   type: { type: String, required: true },
//   mimetype: { type: String, required: true, enum: ['image/png', 'image/jpeg', 'image/x-icon', 'image/svg+xml'] },

//   size: { type: Number, default: 0 },
//   width: { type: Number, default: 0 },
//   height: { type: Number, default: 0 },

//   ['T_CREATE']: { type: Date, default: Date.now },
//   ['T_UPDATE']: { type: Date, default: Date.now }
// });



const images = [
  { id: '000', key: 'SZ0ryoVzsWHBa3kYFnnGa', name: '1e82c5', type: 'png', mimetype: 'image/png' },
  { id: '100', key: 'SB0Bjfut1q6vxnJM2-VNC', name: '8d6888', type: 'png', mimetype: 'image/png' },
  { id: '200', key: 'hrIB9Tz80wBqcRPm-MN2G', name: '34ffb1', type: 'png', mimetype: 'image/png' },
  { id: '300', key: '-zr_U-FGhrYSGDIF0yJBE', name: '2561a6', type: 'png', mimetype: 'image/png' },
  { id: '400', key: 'dmH1ukiO4DgEZkO3TFQFZ', name: '4661eb', type: 'png', mimetype: 'image/png' },
  { id: '500', key: 'yE7Ny1AJaUqTGAg9z1ChM', name: '989612', type: 'png', mimetype: 'image/png' }
];

export { images };