exports.isAdmin = (req, res, next) => {
    if (!req.session.adminId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in as admin.' });
    }
    next();
};
