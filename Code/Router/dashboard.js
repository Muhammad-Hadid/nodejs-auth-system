const express = require('express');
const router = express.Router();
const authmiddleware = require("../middlware/authmiddlware")

// Protected Route
router.get('/dashboard', authmiddleware, (req, res) => {
    res.status(200).json({
        message: `Welcome to your dashboard, ${req.user.email}!`,
        user: req.user
    });
});

module.exports = router;
