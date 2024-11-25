// routes/buildMealRoute.js
import express from 'express';
import { getBuildMealPage } from '../controllers/buildMealController.js';

const router = express.Router();

router.get('/build-meal', getBuildMealPage);

export default router;
