//// Core modules

//// External modules
const express = require('express');

//// Modules

// Router
let router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

        res.render('index.html', { 
            ip: ip 
        });
    } catch (err) {
        next(err);
    }
});


module.exports = router;