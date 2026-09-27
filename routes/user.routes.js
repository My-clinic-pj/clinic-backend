import express from 'express';
import { createUser, getClinicUsers } from '../controllers/user.controller.js';

const router = express.Router();

// ဝန်ထမ်းအသစ် ဖန်တီးရန်
router.route('/')
    .post(createUser);

// ဆေးခန်းတစ်ခုတည်းက ဝန်ထမ်းတွေကို ဆွဲထုတ်ရန်
router.route('/clinic/:clinicId')
    .get(getClinicUsers);

export default router;