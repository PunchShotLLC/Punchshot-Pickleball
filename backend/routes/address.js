// backend/routes/address.js

import express from 'express';
import { getAddressInfo } from '../controllers/addressController.js'; 

const router = express.Router();

// Make sure the route parameter matches what you're sending from the frontend.
router.get('/:address', async (req, res) => {
    try {
      // Decode the URI component in case the address includes special characters
      const addressInfo = await getAddressInfo(decodeURIComponent(req.params.address));
      res.json(addressInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;