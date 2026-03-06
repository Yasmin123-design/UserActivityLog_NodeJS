const kafka = require('./kafkaClient');

class KafkaProducer {
    constructor() {
        this.producer = kafka.producer();
    }

    async connect() {
        await this.producer.connect();
        console.log('Kafka Producer connected');
    }

    async publish(topic, message) {
        try {
            await this.producer.send({
                topic,
                messages: [{ value: JSON.stringify(message) }]
            });
            console.log(`Produced message to topic ${topic}:`, message);
        } catch (error) {
            console.error('Kafka Produce error:', error);
        }
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}

module.exports = new KafkaProducer();
