const express = require('express');
const User = require('../controllers/user');
const router = express.Router();
const Custom = require('../middlewares/middlewares');

router.get('/health', (req, res) => res.status(200).json({status:200 , Uptime: new Date().toISOString() }));
// -------- user ---------------------
router.post('/create',Custom.bodyValidationCreate,User.create);
router.post('/login', Custom.bodyValidationLogin, User.login);
//--------- rick and morty------------

module.exports = router;