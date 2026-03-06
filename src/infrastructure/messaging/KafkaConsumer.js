const kafka = require('./kafkaClient');

class KafkaConsumer {
    constructor() {
        this.consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'activity-log-group' });
    }

    async connect() {
        await this.consumer.connect();
        console.log('Kafka Consumer connected');
    }

    async subscribe(topic, onMessage) {
        await this.consumer.subscribe({ topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const payload = JSON.parse(message.value.toString());
                console.log(`Received message from ${topic}:`, payload);
                await onMessage(payload);
            }
        });
    }

    async disconnect() {
        await this.consumer.disconnect();
    }
}

module.exports = new KafkaConsumer();
