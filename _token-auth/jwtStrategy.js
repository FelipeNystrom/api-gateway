const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'gatewayService',
  brokers: ['kafka:9092']
});

kafka.producer();
kafka.consumer({ groupId: 'gatewayService-group' });

const { PUBLIC_KEY } = process.env;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY
};

module.exports = new JWTStrategy(options, async (jwt_payload, done) => {
  debugger;
  try {
    debugger;
    await producer.connect();

    await consumer.subscribe({ topic: 'user_auth_reply' });

    await producer.send({
      topic: 'user_auth',
      messages: [{ value: Buffer.from(jwt_payload.sub) }],
      acks: 1
    });

    debugger;

    producer.disconnect();

    await consumer.connect();
    const getMessage = new Promise((resolve, _) => {
      let fetchedAuthorInfo;

      consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          // const prefix = `${topic}[${partition} | ${message.offset}] / ${
          //   message.timestamp
          // }`;

          fetchedAuthorInfo = JSON.parse(message.value.toString('utf8'));
          debugger;
          if (fetchedAuthorInfo) {
            resolve(fetchedAuthorInfo);
          } else {
            reject();
          }
        }
      });
    });

    const verified = await getMessage;
    consumer.disconnect();

    // req.post(authServiceRoute, { username: jwt_payload.sub });

    if (verified) {
      debugger;
      done(null, verified);
    } else {
      debugger;
      done(null, false);
    }
  } catch (error) {
    debugger;
    done(error, false);
  }
});
