const bcrypt=require('bcryptjs');
const db=require('../db/config');

// Registering a new patient in the system

exports.registerPatient = async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address]
        );
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

// Login an existing user in the system

exports.loginPatient = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const patient = rows[0];
        const isPasswordValid = await bcrypt.compare(password, patient.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        req.session.patientId = patient.id;
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
