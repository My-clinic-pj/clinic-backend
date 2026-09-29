import Patient from '../models/patient.js';

// @desc    လူနာအသစ် စာရင်းသွင်းရန်
// @route   POST /api/patients
export const createPatient = async (req, res) => {
    try {
        // Frontend ကနေ အမှားအယွင်းနဲ့ clinicId ပါလာခဲ့ရင်တောင် ဖယ်ထုတ်ပြီး ကျန်တဲ့ data (userId အပါအဝင်) ကိုပဲ ယူပါမယ်
        const { clinicId, ...patientData } = req.body;

        if (!patientData.userId) {
            return res.status(400).json({ success: false, message: "Doctor (User) ID လိုအပ်ပါသည်" });
        }

        const newPatient = new Patient(patientData);
        const savedPatient = await newPatient.save();

        res.status(201).json({ success: true, data: savedPatient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    သက်ဆိုင်ရာ ဆရာဝန် (Doctor) တစ်ယောက်တည်းမှ လူနာများကိုသာ ဆွဲထုတ်ရန်
// @route   GET /api/patients/doctor/:userId  (Route ကို clinic အစား doctor လို့ ပြောင်းသုံးရင် ပိုရှင်းပါတယ်)
export const getPatients = async (req, res) => {
    try {
        // URL ကနေ ပါလာတဲ့ userId (Doctor ID) ကို ယူပါမယ်
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Doctor (User) ID လိုအပ်ပါသည်" });
        }

        // Database (Patient Model) ထဲမှာ ရှိတဲ့ userId နဲ့ တိုက်စစ်ပြီး ဆွဲထုတ်ပါမယ်
        const patients = await Patient.find({ userId: userId });

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
            new: true,
            runValidators: true
        });

        if (!patient) {
            return res.status(404).json({ success: false, message: 'ပြင်ဆင်လိုသော လူနာကို ရှာမတွေ့ပါ' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        next(error);
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