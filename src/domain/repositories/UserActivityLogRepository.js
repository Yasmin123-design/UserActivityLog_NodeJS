
class UserActivityLogRepository {
    async save(userActivityLog) {
        throw new Error('Method not implemented');
    }

    async findAll({ userId, activity, startDate, endDate, page, limit }) {
        throw new Error('Method not implemented');
    }
}

module.exports = UserActivityLogRepository;
