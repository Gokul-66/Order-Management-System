import {
  createProduct as createProductService,
  updateProductStatus as updateProductStatusService,
  getFaultyProducts as getFaultyProductsService,
  getProducts as getProductsService,
} from '../services/productService.js';

export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { status, updatedByType, updatedById } = req.body;

    const product = await updateProductStatusService(
      productId,
      status,
      updatedByType,
      updatedById
    );

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const getFaultyProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getFaultyProductsService({ page, limit });
    return res.status(200).json({
      success: true,
      data: result.items,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: result.pages,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getProductsService({ page, limit });
    return res.status(200).json({
      success: true,
      data: result.items,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: result.pages,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
