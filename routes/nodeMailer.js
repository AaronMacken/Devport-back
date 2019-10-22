const express = require('express');
const router = express.Router();

const {sendMail} = require('../handlers/nodeMailer');

router.route('/').post(sendMail);

module.exports = router;