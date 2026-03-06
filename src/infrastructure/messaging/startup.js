const kafkaConsumer = require('./KafkaConsumer');
const kafkaProducer = require('./KafkaProducer');
const MongoUserActivityLogRepository = require('../persistence/MongoUserActivityLogRepository');

const repository = new MongoUserActivityLogRepository();

const startMessaging = async () => {
    try {
        await kafkaProducer.connect();

        await kafkaConsumer.connect();
        const topic = process.env.KAFKA_TOPIC || 'user-activities';

        await kafkaConsumer.subscribe(topic, async (payload) => {
            try {
                console.log('Processing activity log from Kafka:', payload.userId);
                await repository.save(payload);
            } catch (err) {
                console.error('Error saving log from Kafka:', err);
            }
        });

        console.log('Messaging system (Kafka) is ready');
    } catch (error) {
        console.error('Failed to start messaging system:', error);
    }
};

module.exports = startMessaging;
