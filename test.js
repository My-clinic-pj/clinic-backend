import mongoose from 'mongoose';
import Patient from './models/patient.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DB_URL).then(async () => {
    console.log("Connected");
    const p = await Patient.findOne();
    console.log("Found patient:", p);
    if (p) {
        let updateData = {
            status: 'Completed',
            payment: { type: 'Cash Payment', amount: 500, settledAt: Date.now() }
        };
        const updated = await Patient.findByIdAndUpdate(p._id, updateData, { new: true, runValidators: true });
        console.log("Updated patient:", updated);
    }
    process.exit(0);
});
