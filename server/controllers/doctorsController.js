const db = require('../db/config');
const bcrypt = require('bcryptjs');

// Create a new doctor
exports.createDoctor = async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, specialization, email, phone, schedule]
        );
        res.status(201).json({ message: 'Doctor created successfully', doctorId: result.insertId });
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ error: 'Failed to create doctor' });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const [doctors] = await db.query('SELECT * FROM doctors');
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
    const { id } = req.params;

    try {
        const [doctor] = await db.execute('SELECT * FROM doctors WHERE id = ?', [id]);
        if (doctor.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor[0]);
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ error: 'Failed to fetch doctor' });
    }
};

// Update doctor profile or schedule
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? WHERE id = ?',
            [first_name, last_name, specialization, email, phone, schedule, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ error: 'Failed to update doctor' });
    }
};

// Delete (or deactivate) a doctor
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
