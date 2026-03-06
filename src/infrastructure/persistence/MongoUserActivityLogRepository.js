const UserActivityLogRepository = require('../../domain/repositories/UserActivityLogRepository');
const UserActivityLogModel = require('./UserActivityLogModel');
const UserActivityLog = require('../../domain/entities/UserActivityLog');

class MongoUserActivityLogRepository extends UserActivityLogRepository {
    async save(userActivityLog) {
        const model = new UserActivityLogModel({
            userId: userActivityLog.userId,
            activity: userActivityLog.activity,
            timestamp: userActivityLog.timestamp,
            metadata: userActivityLog.metadata
        });
        await model.save();
    }

    async findAll({ userId, activity, startDate, endDate, page = 1, limit = 10 }) {
        const query = {};
        if (userId) query.userId = userId;
        if (activity) query.activity = activity;
        if (startDate || endDate) {
            query.timestamp = {};
            if (startDate) query.timestamp.$gte = new Date(startDate);
            if (endDate) query.timestamp.$lte = new Date(endDate);
        }

        const skip = (page - 1) * limit;
        const [docs, total] = await Promise.all([
            UserActivityLogModel.find(query).sort({ timestamp: -1 }).skip(skip).limit(limit).lean(),
            UserActivityLogModel.countDocuments(query)
        ]);

        const logs = docs.map(doc => new UserActivityLog({
            id: doc._id,
            userId: doc.userId,
            activity: doc.activity,
            timestamp: doc.timestamp,
            metadata: doc.metadata
        }));

        return { logs, total };
    }
}

module.exports = MongoUserActivityLogRepository;
