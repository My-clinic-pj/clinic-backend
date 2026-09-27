import mongoose from 'mongoose';
import Patient from './models/patient.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DB_URL).then(async () => {
    const p = await Patient.findOne();
    console.log(p._id.toString());
    process.exit(0);
});
