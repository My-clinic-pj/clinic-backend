import User from '../models/user.model.js';

// @desc    ဝန်ထမ်း/ဆရာဝန် အကောင့်အသစ် ဖန်တီးရန်
// @route   POST /api/users
export const createUser = async (req, res) => {
    try {
        const { clerkUserId, clinicId, name, email, role } = req.body;

        const user = await User.create({
            clerkUserId,
            clinicId,
            name,
            email,
            role
        });

        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    သက်ဆိုင်ရာ ဆေးခန်းတစ်ခုတည်းမှ ဝန်ထမ်းများကိုသာ ဆွဲထုတ်ရန်
// @route   GET /api/users/clinic/:clinicId
export const getClinicUsers = async (req, res) => {
    try {
        const users = await User.find({ clinicId: req.params.clinicId });

        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};