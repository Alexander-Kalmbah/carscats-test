// import mongoose from 'mongoose';
// import { BRAND, KEY } from '../constants';

// const Schema = mongoose.Schema;

// const brandSchema = new Schema({
//   // _id
//   name: { type: String, minlength: 2, maxlength: 72, required: true, default: 'NO_NAME' },
//   [KEY.T_CRE]: { type: Date, default: Date.now }
// });


// const init = function (name, schema, connection = void(0)) {
//   try {
//     return mongoose.model(name, schema, connection);
//   } catch (error) {
//     return mongoose.model(name);
//   }
// };

// const BrandModel = init(BRAND, brandSchema);
// export default BrandModel;

// --------

const brands = [
  { id: '0000', name: 'KIA', initial: { time: "2022-01-31T11:18:19.001Z" } },
  { id: '0001', name: 'KIA', initial: { time: "2022-01-31T11:18:19.001Z" } },
  { id: '0002', name: 'KIA', initial: { time: "2022-01-31T11:18:19.001Z" } },
  { id: '0003', name: 'KIA', initial: { time: "2022-01-31T11:18:19.001Z" } },
  { id: '0004', name: 'KIA', initial: { time: "2022-01-31T11:18:19.001Z" } },
  { id: '0005', name: 'KIA', initial: { time: "2022-01-31T11:18:19.001Z" } },
  { id: '0006', name: 'KIA', initial: { time: "2022-01-31T11:18:19.001Z" } }
];

export { brands };