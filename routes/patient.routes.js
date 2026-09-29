import express from 'express';
import { createPatient, getPatients, updatePatient, deletePatient } from '../controllers/patient.controller.js';
// ⚠️ ဒီအကြောင်းလေး အသစ်ပါလာပါတယ် (လုံခြုံရေးဂိတ်ကို လှမ်းခေါ်တာပါ)
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// လူနာအသစ်သွင်းရန် (ဒါကတော့ ဂိတ်မခံထားပါဘူး)
router.route('/')
    .post(createPatient);

// ⚠️ ပြင်ဆင်ချက်: လူနာစာရင်းဆွဲထုတ်ရန် (clinic အစား doctor/userId သို့ ပြောင်းထားပါသည်)
router.route('/doctor/:userId')
    .get(getPatients);

// ⚠️ ဒီနေရာမှာ requireAuth တွေ ဝင်လာပါပြီ
router.route('/:id')
    .put(requireAuth, updatePatient)     // ပြင်မယ်ဆိုရင် ဂိတ်ကိုအရင်ဖြတ်ပါ
    .delete(requireAuth, deletePatient); // ဖျက်မယ်ဆိုရင် ဂိတ်ကိုအရင်ဖြတ်ပါ

export default router;