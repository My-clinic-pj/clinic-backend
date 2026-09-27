import axios from 'axios';
(async () => {
  try {
    // 1. Create a patient
    const createRes = await axios.post('http://localhost:4030/api/patients', {
      clinicId: '651f8a8b8c2c1a4e12345678',
      name: 'Test Patient',
      phone: '0912345678',
      age: 30
    });
    const patientId = createRes.data.data._id;
    console.log("Created:", patientId);

    // 2. Update patient (using the same payload as frontend)
    // We don't have token, but requireAuth is on the route. Let's see if it fails.
    const updateRes = await axios.put(`http://localhost:4030/api/patients/${patientId}`, {
      status: 'Completed',
      vitals: { bloodPressure: '120/80', bodyTemperature: '98.6' },
      payment: { type: 'Cash Payment', amount: 5000 }
    });
    console.log("Updated:", updateRes.data.data.status);

    // 3. Get patients
    const getRes = await axios.get(`http://localhost:4030/api/patients/clinic/651f8a8b8c2c1a4e12345678`);
    const p = getRes.data.data.find(x => x._id === patientId);
    console.log("Fetched status:", p.status);
    
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
})();
