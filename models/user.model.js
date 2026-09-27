import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'အမည် ထည့်ရန်လိုအပ်ပါသည် (Username is required)'],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'ဖုန်းနံပါတ် ထည့်ရန်လိုအပ်ပါသည် (Phone is required)'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'စကားဝှက် ထည့်ရန်လိုအပ်ပါသည် (Password is required)'],
        },
        // Optional fields kept for compatibility or future use
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
        },
        role: {
            type: String,
            enum: ['SuperAdmin', 'ClinicAdmin', 'Doctor', 'Receptionist'],
            default: 'Receptionist',
        }
    },
    {
        timestamps: true,
    }
);

// Password verification helper method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;