import express from 'express';
import { createBento, getAllBentos, removeBento } from '../controllers/bentoController.js';

const bentoRouter = express.Router();

// Define the routes
bentoRouter.post('/', createBento); // Create Bento
bentoRouter.get('/', getAllBentos); // Get all Bentos for a user
bentoRouter.delete('/:itemId', removeBento); // Remove a Bento using itemId in the URL
router.get('/', (req, res) => {
    res.json({ message: 'List of Bento items' });
  });
export default bentoRouter;
