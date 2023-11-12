import express from 'express';
const router = express.Router();

// Assuming getAddressInfo is exported from a service or controller file
import { getAddressInfo } from '../controllers/addressController.js'; 

router.get('/:address', async (req, res) => {
  try {
    const addressInfo = await getAddressInfo(req.params.address);
    res.json(addressInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;