import express from 'express';
import { createVisit, getPatientVisits } from '../controllers/visit.controller.js';

const router = express.Router();

// မှတ်တမ်းအသစ်သွင်းရန်
router.route('/')
    .post(createVisit);

// လူနာတစ်ယောက်ရဲ့ မှတ်တမ်းတွေ ဆွဲထုတ်ရန် (URL မှာ patientId ပါလာရပါမယ်)
router.route('/patient/:patientId')
    .get(getPatientVisits);

export default router;