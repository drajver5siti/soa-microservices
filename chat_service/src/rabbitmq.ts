import amqp, { Channel, Connection } from 'amqplib'
import { Event } from './types/message.js';

let connection: Connection = {} as Connection;
let channel: Channel = {} as Channel;

const exchangeName = "notifications";

const establishConnection = async () => {
    const opt = {
        protocol: 'amqp',
        hostname: 'rabbitmq',
        port: 5672,
        heartbeat: 60
    }

    connection = await amqp.connect(opt);
    channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, "fanout", { durable: true });
    await channel.assertQueue('chats');
    await channel.bindQueue('chats', exchangeName, '');
}

const closeConnection = () => {
    connection.close();
}

const publishMessage = (routingKey: string, data: Event) => {
    channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)));
}

const receiveMessage = (
    routingKey: string, 
    handleMessage: (data: Event) => void
) => {
    channel.consume(routingKey, (msg) => {
        const message = msg?.content.toString();
        if(message) {
            // Should validate
            handleMessage(JSON.parse(message))
        }

        if(msg) {
            channel.ack(msg);
        }
    })
}

export { establishConnection, closeConnection, publishMessage, receiveMessage };