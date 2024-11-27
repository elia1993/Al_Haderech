import express from 'express';
import { createBento, getAllBentos, removeBento } from '../controllers/bentoController.js';

const bentoRouter = express.Router();

// Define the routes
bentoRouter.post('/Create', createBento); // Create Bento
bentoRouter.get('/GetBentos', getAllBentos); // Get all Bentos for a user
bentoRouter.delete('/:itemId', removeBento); // Remove a Bento using itemId in the URL

export default bentoRouter;
