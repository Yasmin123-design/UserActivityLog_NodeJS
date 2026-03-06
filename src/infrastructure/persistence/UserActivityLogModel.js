const mongoose = require('mongoose');

const userActivityLogSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    activity: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
});


userActivityLogSchema.index({ userId: 1, activity: 1, timestamp: -1 });

module.exports = mongoose.model('UserActivityLog', userActivityLogSchema);
