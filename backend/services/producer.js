// Backend directory contains services for:
    // Kafka production and consumption
    // DynamoDB - Model that is used to save data
    // Server setup file for handling WebSocket connections & integrating Kafka

// Producer.js Purpose:
    // Kafka producer generates random data at intervals & sends it to a Kafka topic
    // Simulaates real-time data that frontend will visualize

/* -------------------------------------------------------------------*/

// Import Kafka and create a producer instance
const kafka = require('kafka-node');
const { Producer } = kafka;

// Kafka client connected to localhost broker
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

// Producer Ready Event
producer.on('ready', () => {
    // Sends data every second
    setInterval(() => {
        const data = {
            id: Date.now(), // Unique ID based on the timestamp
            time: new Date().toISOString(), // Current time
        }
})
