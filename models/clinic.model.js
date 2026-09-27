import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'ဆေးခန်းအမည် ထည့်ရန်လိုအပ်ပါသည်'],
            trim: true,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
            required: [true, 'ဆက်သွယ်ရန် ဖုန်းနံပါတ် ထည့်ရန်လိုအပ်ပါသည်'],
        },
        // SaaS သက်တမ်းထိန်းချုပ်ရန် (ဥပမာ - ၃လ၊ ၆လ)
        subscriptionExpiryDate: {
            type: Date,
            required: true,
        },
        // အက်ဒမင်ဘက်ကနေ ဆေးခန်းကို ယာယီပိတ်ထားချင်တဲ့အခါ သုံးရန်
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

const Clinic = mongoose.model('Clinic', clinicSchema);

export default Clinic;