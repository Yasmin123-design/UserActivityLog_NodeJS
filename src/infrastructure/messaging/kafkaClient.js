const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');

dotenv.config();

process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1';

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'activity-log-service',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

module.exports = kafka;
