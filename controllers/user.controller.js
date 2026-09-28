import User from '../models/user.model.js';


export const createUser = async (req, res) => {
    try {
        const { username, phone, password, clinicId, role } = req.body;

        const user = await User.create({
            username,
            phone,
            password,
            clinicId,
            role
        });

        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


export const getClinicUsers = async (req, res) => {
    try {
        const users = await User.find({ clinicId: req.params.clinicId });

        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};