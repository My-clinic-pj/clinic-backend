import Clinic from '../models/clinic.model.js';

// @desc    ဆေးခန်းအသစ် ဖန်တီးရန်
// @route   POST /api/clinics
export const createClinic = async (req, res) => {
    try {
        const { name, address, phone, subscriptionExpiryDate } = req.body;

        const clinic = await Clinic.create({
            name,
            address,
            phone,
            subscriptionExpiryDate
        });

        res.status(201).json({ success: true, data: clinic });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    ဆေးခန်းစာရင်း အားလုံးကို ကြည့်ရန် (SuperAdmin အတွက်)
// @route   GET /api/clinics
export const getClinics = async (req, res) => {
    try {
        const clinics = await Clinic.find();
        res.status(200).json({ success: true, count: clinics.length, data: clinics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};