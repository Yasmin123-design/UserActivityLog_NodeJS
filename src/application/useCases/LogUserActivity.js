const UserActivityLog = require('../../domain/entities/UserActivityLog');
const kafkaProducer = require('../../infrastructure/messaging/KafkaProducer');

class LogUserActivity {
    async execute({ userId, activity, metadata }) {
        const log = new UserActivityLog({ userId, activity, metadata });
        log.validate();

        const topic = process.env.KAFKA_TOPIC || 'user-activities';
        await kafkaProducer.publish(topic, {
            userId: log.userId,
            activity: log.activity,
            timestamp: log.timestamp,
            metadata: log.metadata
        });

        return log;
    }
}

module.exports = new LogUserActivity();
