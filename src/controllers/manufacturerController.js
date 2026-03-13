import {
  createManufacturer as createManufacturerService,
  getManufacturers as getManufacturersService,
} from '../services/manufacturerService.js';

export const createManufacturer = async (req, res) => {
  try {
    const manufacturer = await createManufacturerService(req.body);
    return res.status(201).json({ success: true, data: manufacturer });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const getManufacturers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getManufacturersService({ page, limit });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
