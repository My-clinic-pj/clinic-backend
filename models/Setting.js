import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    clinicName: { type: String, required: true },
    address: { type: String, required: true },
    signature: { type: String, default: '' },
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
