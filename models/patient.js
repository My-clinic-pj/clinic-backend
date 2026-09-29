import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
    {
        // Multi-tenant (Clinic) အစား Doctor တစ်ယောက်ကို ဆေးခန်းတစ်ခုအဖြစ် သတ်မှတ်ရန်
        // Doctor ရဲ့ User ID နဲ့ တိုက်ရိုက်ချိတ်ဆက်ပါမည်
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Clinic အစား User (Doctor) ကို ပြောင်းချိတ်ထားသည်
            required: true,
        },
        name: {
            type: String,
            required: [true, 'လူနာအမည် ထည့်ရန်လိုအပ်ပါသည်'],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'ဖုန်းနံပါတ် ထည့်ရန်လိုအပ်ပါသည်'],
        },
        age: {
            type: Number,
            required: [true, 'အသက် ထည့်ရန်လိုအပ်ပါသည်'],
        },
        address: {
            type: String,
        },
        allergies: {
            type: String,
        },
        registeredDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['Checking', 'Completed'],
            default: 'Checking'
        },
        visitHistory: [{
            date: { type: Date, default: Date.now },
            status: String,
            bloodPressure: String,
            bodyTemperature: String,
            paymentType: String,
            paymentAmount: Number,
            reasonForReturn: String
        }],
        nextAppointmentDate: {
            type: Date,
            default: null
        },
        nextAppointmentReason: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;