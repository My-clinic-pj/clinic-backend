import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import clinicRoutes from './routes/clinic.routes.js';
import patientRoutes from './routes/patient.routes.js';
import visitRoutes from './routes/visit.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: ["https://clinic-frontend-pearl-delta.vercel.app", "http://localhost:5173"], // Frontend Link အသစ်ကို ထည့်ပေးခြင်း
    credentials: true
}));
app.use(express.json());

connectDB();

app.use('/api/clinics', clinicRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);

//error handler
app.use(errorHandler);




const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Vercel အတွက် Export လုပ်ပေးခြင်း
module.exports = app;