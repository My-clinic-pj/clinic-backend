import Visit from '../models/visit.model.js';

// @desc    ဆေးခန်းပြမှတ်တမ်းအသစ် ဖန်တီးရန်
// @route   POST /api/visits
export const createVisit = async (req, res) => {
    try {
        const { clinicId, patientId, bloodPressure, bodyTemperature, payAmount, paymentType } = req.body;

        const visit = await Visit.create({
            clinicId,
            patientId,
            bloodPressure,
            bodyTemperature,
            payAmount,
            paymentType
        });

        res.status(201).json({ success: true, data: visit });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    လူနာတစ်ဦးချင်းစီရဲ့ ဆေးခန်းပြမှတ်တမ်းများကို ပြန်ကြည့်ရန်
// @route   GET /api/visits/patient/:patientId
export const getPatientVisits = async (req, res) => {
    try {
        // လူနာရဲ့ ID နဲ့ ရှာပြီး၊ နောက်ဆုံးပြခဲ့တဲ့ ရက်စွဲကို အပေါ်ဆုံးမှာ ပြရန် (sort) လုပ်ထားပါတယ်
        const visits = await Visit.find({ patientId: req.params.patientId }).sort({ date: -1 });

        res.status(200).json({ success: true, count: visits.length, data: visits });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};