import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(requireAuth, getSettings)
    .put(requireAuth, updateSettings)
    .post(requireAuth, updateSettings);

export default router;
