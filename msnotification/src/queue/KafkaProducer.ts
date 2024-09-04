import { Kafka, Producer } from 'kafkajs';

class KafkaProducer {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'msnotification',
      brokers: ['kafka:9092'],
    });

    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}

export const kafkaProducer = new KafkaProducer();
