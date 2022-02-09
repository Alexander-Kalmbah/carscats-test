import { RESPONSE } from "../../../src/constants";

const BRANDS = [
  {
    id: '0000', name: 'name 0', marks: [
      { id: '00', brandId: '0000', source: 'SZ0ryoVzsWHBa3kYFnnGa', name: 'Mark 0' },
      { id: '01', brandId: '0000', source: 'SB0Bjfut1q6vxnJM2-VNC', name: 'Mark 1' },
      { id: '02', brandId: '0000', source: 'hrIB9Tz80wBqcRPm-MN2G', name: 'Mark 2' }
    ]
  },
  {
    id: '0001', name: 'name 1', marks: [
      { id: '03', brandId: '0001', source: '-zr_U-FGhrYSGDIF0yJBE', name: 'Mark 3' },
      { id: '04', brandId: '0001', source: 'dmH1ukiO4DgEZkO3TFQFZ', name: 'Mark 4' },
      { id: '05', brandId: '0001', source: 'yE7Ny1AJaUqTGAg9z1ChM', name: 'Mark 5' },
      { id: '06', brandId: '0001', source: 'SZ0ryoVzsWHBa3kYFnnGa', name: 'Mark 6' },
      { id: '09', brandId: '0001', source: '', name: 'Mark 9' },
      { id: '0A', brandId: '0001', source: '', name: 'Mark A' },
    ]
  },
  {
    id: '0002', name: 'name 2', marks: [
      { id: '07', brandId: '0002', source: 'SB0Bjfut1q6vxnJM2-VNC', name: 'Mark 7' },
      { id: '08', brandId: '0002', source: 'hrIB9Tz80wBqcRPm-MN2G', name: 'Mark 8' },
    ]
  },
  {
    id: '0003', name: 'name 3', marks: [
      // EMPTY
    ]
  }
];

export default async function handler(req, res) {
  try {
    if(req.method === 'GET') {
      return res.status(200).json({
        brands: BRANDS
      });
    };

    return res.status(405).json({ error: RESPONSE[405] });
  } catch (error) {
    return res.status(500).json({ error: RESPONSE[500] });
  }
};