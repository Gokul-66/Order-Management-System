import {
  createCustomer as createCustomerService,
  getCustomers as getCustomersService,
} from '../services/customerService.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = await createCustomerService(req.body);
    return res.status(201).json({ success: true, data: customer });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getCustomersService({ page, limit });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
