import {
  createSeller as createSellerService,
  getSellers as getSellersService,
} from '../services/sellerService.js';

export const createSeller = async (req, res) => {
  try {
    const seller = await createSellerService(req.body);
    return res.status(201).json({ success: true, data: seller });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const getSellers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getSellersService({ page, limit });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
