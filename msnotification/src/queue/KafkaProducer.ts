import fs from 'fs';
import path from 'path';
import { Kafka, Producer } from 'kafkajs';

class KafkaProducer {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'msnotification',
      brokers: ['localhost:9092'],
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

  encodeImageToBase64(filePath: string): string {
    const imageBuffer = fs.readFileSync(path.resolve(filePath));
    return imageBuffer.toString('base64');
  }

  async sendEncodedImage(topic: string, imagePath: string) {
    const encodedImage = this.encodeImageToBase64(imagePath);

    await this.producer.send({
      topic,
      messages: [{ value: encodedImage }],
    });
  }


  async disconnect() {
    await this.producer.disconnect();
  }
}

export default new KafkaProducer();