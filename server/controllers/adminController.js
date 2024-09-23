const bcrypt = require('bcryptjs');
const db = require('../db/config');

// Admin login
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM admin WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        const admin = rows[0];

        const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        req.session.adminId = admin.id;
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// View all patients
exports.getAllPatients = async (req, res) => {
    try {
        const [patients] = await db.query('SELECT * FROM patients');
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};

// View all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const [appointments] = await db.query(`
            SELECT appointments.id, patients.first_name AS patient_first_name, patients.last_name AS patient_last_name, 
                   doctors.first_name AS doctor_first_name, doctors.last_name AS doctor_last_name, 
                   appointments.appointment_date, appointments.appointment_time, appointments.status 
            FROM appointments 
            JOIN patients ON appointments.patient_id = patients.id 
            JOIN doctors ON appointments.doctor_id = doctors.id
        `);
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM patients WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Failed to delete patient' });
    }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM doctors WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ error: 'Failed to delete doctor' });
    }
};
