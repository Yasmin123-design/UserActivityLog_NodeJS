const logUserActivity = require('../../../application/useCases/LogUserActivity');
const FetchUserActivityLogs = require('../../../application/useCases/FetchUserActivityLogs');
const MongoUserActivityLogRepository = require('../../../infrastructure/persistence/MongoUserActivityLogRepository');

class UserActivityLogController {
    constructor() {
        const repository = new MongoUserActivityLogRepository();
        this.fetchUserActivityLogs = new FetchUserActivityLogs(repository);
    }

    async logActivity(req, res) {
        try {
            const { userId, activity, metadata } = req.body;
            const log = await logUserActivity.execute({ userId, activity, metadata });
            res.status(202).json({ message: 'Activity received and being processed', data: log });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getLogs(req, res) {
        try {
            const { userId, activity, startDate, endDate, page, limit } = req.query;
            const result = await this.fetchUserActivityLogs.execute({
                userId,
                activity,
                startDate,
                endDate,
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserActivityLogController();
