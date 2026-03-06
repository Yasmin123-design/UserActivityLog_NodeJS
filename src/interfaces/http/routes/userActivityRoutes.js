const express = require('express');
const router = express.Router();
const userActivityLogController = require('../controllers/UserActivityLogController');

router.post('/logs', (req, res) => userActivityLogController.logActivity(req, res));
router.get('/logs', (req, res) => userActivityLogController.getLogs(req, res));

module.exports = router;
