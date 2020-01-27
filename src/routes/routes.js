const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => res.status(200).json({status:200 , message:"hello friend..."}));
module.exports = router