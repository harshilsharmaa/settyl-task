const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Please login first",
                success: false
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.isAdmin = async (req, res, next) => {
    
        try {
            if (req.user.userRole !== 'admin') {
                return res.status(403).json({
                    message: "You are not authorized to access this resource",
                    success: false
                })
            }
            next();
        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            })
        }
}