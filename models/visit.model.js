import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
    {
        // ဘယ်ဆေးခန်းရဲ့ မှတ်တမ်းလဲဆိုတာ ခွဲခြားရန် (Multi-tenant)
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true,
        },
        // ဘယ်လူနာရဲ့ မှတ်တမ်းလဲဆိုတာ သိရန်
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        // လူနာကြည့်ပြီးပြီလား၊ စောင့်နေတုန်းလား ခွဲခြားရန်
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled'],
            default: 'Pending',
        },
        bloodPressure: {
            type: String, // ဥပမာ - "120/80"
        },
        bodyTemperature: {
            type: Number, // ဥပမာ - 98.6
        },
        payAmount: {
            type: Number,
        },
        paymentType: {
            type: String,
            enum: ['Cash', 'KPay', 'WavePay', 'Credit Card'], // အခြား Payment တွေရှိရင်လည်း ထပ်တိုးလို့ရပါတယ်
            default: 'Cash'
        }
    },
    {
        timestamps: true,
    }
);

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;