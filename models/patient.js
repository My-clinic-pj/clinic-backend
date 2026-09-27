import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
    {
        // Multi-tenant အတွက် အရေးအကြီးဆုံး field (ဆေးခန်းနဲ့ ချိတ်ဆက်ခြင်း)
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true,
        },
        name: {
            type: String,
            required: [true, 'လူနာအမည် ထည့်ရန်လိုအပ်ပါသည်'],
            trim: true, // ရှေ့နောက် space အပိုတွေကို အလိုလို ဖြတ်ပေးဖို့
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
            reasonForReturn: String // if it was a follow-up
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
        timestamps: true, // createdAt နဲ့ updatedAt ကို အလိုလို ထည့်ပေးပါမယ်
    }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;