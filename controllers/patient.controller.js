import Patient from '../models/patient.js';

// @desc    လူနာအသစ် စာရင်းသွင်းရန်
// @route   POST /api/patients
export const createPatient = async (req, res) => {
    try {
        // req.body ထဲမှာ userId (ဒီလူနာကို သွင်းတဲ့ ဆရာဝန်ရဲ့ ID) ပါလာရပါမယ်။
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();

        res.status(201).json({ success: true, data: savedPatient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    သက်ဆိုင်ရာ ဆေးခန်းတစ်ခုတည်းမှ လူနာများကိုသာ ဆွဲထုတ်ရန် (Multi-tenant အသက်သွေးကြော)
// @route   GET /api/patients/:clinicId
// @desc    သက်ဆိုင်ရာ ဆေးခန်းတစ်ခုတည်းမှ လူနာများကိုသာ ဆွဲထုတ်ရန် (Multi-tenant အသက်သွေးကြော)
// @route   GET /api/patients/clinic/:clinicId  (Route လမ်းကြောင်းကို ဒီလိုလေးထားရင် ပိုရှင်းပါတယ်)
export const getPatients = async (req, res) => {
    try {
        // URL ကနေ ပါလာတဲ့ clinicId ကို ယူပါမယ်
        const { clinicId } = req.params;

        if (!clinicId) {
            return res.status(400).json({ success: false, message: "Clinic ID လိုအပ်ပါသည်" });
        }

        // Database (Patient Model) ထဲမှာ ရှိတဲ့ clinicId နဲ့ တိုက်စစ်ပြီး ဆွဲထုတ်ပါမယ်
        const patients = await Patient.find({ clinicId: clinicId });

        res.status(200).json({ success: true, count: patients.length, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// @desc    လူနာအချက်အလက် ပြင်ဆင်ရန် (Update)
// @route   PUT /api/patients/:id
export const updatePatient = async (req, res, next) => {
    try {
        const { nextAppointmentDate, nextAppointmentReason, vitals, payment, bloodPressure, bodyTemperature, paymentType, paymentAmount, reasonForReturn, ...restBody } = req.body;
        let updateData = { ...restBody };
        let updateQuery = { $set: updateData };

        // If status is changed to 'Completed', push a new visit object
        // and optionally save the upcoming appointment details
        if (updateData.status === 'Completed') {
            const newVisit = {
                date: Date.now(),
                status: 'Completed',
                bloodPressure: bloodPressure || vitals?.bloodPressure,
                bodyTemperature: bodyTemperature || vitals?.bodyTemperature,
                paymentType: paymentType || payment?.type || payment?.paymentType,
                paymentAmount: paymentAmount || payment?.amount || payment?.paymentAmount,
                reasonForReturn: reasonForReturn
            };

            updateQuery.$push = { visitHistory: newVisit };

            if (nextAppointmentDate !== undefined) {
                updateData.nextAppointmentDate = nextAppointmentDate;
            }
            if (nextAppointmentReason !== undefined) {
                updateData.nextAppointmentReason = nextAppointmentReason;
            }
        }

        const patient = await Patient.findByIdAndUpdate(req.params.id, updateQuery, {
            new: true, // MUST use `new: true` in Mongoose to return the updated document
            runValidators: true
        });

        if (!patient) {
            return res.status(404).json({ success: false, message: 'ပြင်ဆင်လိုသော လူနာကို ရှာမတွေ့ပါ' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        next(error); // Error Handler ဆီကို လှမ်းပို့လိုက်မယ်
    }
};

// @desc    လူနာစာရင်း ဖျက်ရန် (Delete)
// @route   DELETE /api/patients/:id
export const deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({ success: false, message: 'ဖျက်လိုသော လူနာကို ရှာမတွေ့ပါ' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};