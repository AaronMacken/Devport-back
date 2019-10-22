const express = require('express');
const router = express.Router();

const {sendResume} = require('../handlers/resume');

router.route('/').get(sendResume);

module.exports = router;