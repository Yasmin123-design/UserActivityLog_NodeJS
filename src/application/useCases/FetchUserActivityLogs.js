class FetchUserActivityLogs {
    constructor(userActivityLogRepository) {
        this.repository = userActivityLogRepository;
    }

    async execute(filters) {
        return await this.repository.findAll(filters);
    }
}

module.exports = FetchUserActivityLogs;
