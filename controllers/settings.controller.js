import Setting from '../models/Setting.js';

export const getSettings = async (req, res, next) => {
    try {
        const settings = await Setting.findOne();
        res.status(200).json({ success: true, data: settings || null });
    } catch (error) {
        next(error);
    }
};

export const updateSettings = async (req, res, next) => {
    try {
        const { clinicName, address, signature } = req.body;
        const updateData = { clinicName, address, signature };

        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create(updateData);
        } else {
            settings = await Setting.findOneAndUpdate({}, updateData, { new: true, runValidators: true });
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        next(error);
    }
};
