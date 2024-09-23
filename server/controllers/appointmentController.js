const db=require('../db/config');

exports.bookAppointment = async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
            [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled']
        );
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book appointment' });
    }
};
