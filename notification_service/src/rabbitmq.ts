import amqp, { Channel, Connection } from 'amqplib'

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

    await channel.assertQueue('users');
    await channel.assertQueue('posts');

    await channel.bindQueue('users', exchangeName, '');
    await channel.bindQueue('posts', exchangeName, '');
}

const closeConnection = () => {
    connection.close();
}

const publishMessage = (routingKey: string, data: any) => {
    channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)));
}

const receiveMessage = (routingKey: string, handleMessage: (data: any) => void) => {
    channel.consume(routingKey, (msg) => {
        const message = msg?.content.toString();
        if(message) {
            handleMessage(JSON.parse(message))
        }

        if(msg) {
            channel.ack(msg);
        }
    })
}

export { establishConnection, closeConnection, publishMessage, receiveMessage };