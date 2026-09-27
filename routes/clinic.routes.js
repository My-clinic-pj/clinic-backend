import express from 'express';
import { createPatient, getPatients, updatePatient, deletePatient } from '../controllers/patient.controller.js';
// ၁။ အခုလေးတင် ရေးခဲ့တဲ့ လုံခြုံရေးဂိတ်ကို လှမ်းခေါ်ပါ
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(createPatient);

router.route('/clinic/:clinicId')
    .get(getPatients);

// ၂။ လူနာအချက်အလက်ကို ပြင်တာ (PUT) နဲ့ ဖျက်တာ (DELETE) မလုပ်ခင် requireAuth ကို အရင်ဖြတ်ခိုင်းပါ
router.route('/:id')
    .put(requireAuth, updatePatient)    // <--- ဒီမှာ requireAuth ထည့်ပါ
    .delete(requireAuth, deletePatient); // <--- ဒီမှာ requireAuth ထည့်ပါ

export default router;