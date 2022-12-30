const express = require('express')
const app = express()
require('dotenv').config()
const Redis = require("ioredis");
console.log(process.env.REDIS_SERVER_PUBSUB)

const redis = new Redis({url:process.env.REDIS_SERVER_PUBSUB});

const messagesfromredis = []

process.env.SUBSCRIBE_CHANNEL.split(',').map(eachChannel =>{
    redis.subscribe(eachChannel, (err, count) => {
        if (err) {
          console.error("Failed to subscribe: %s", err.message);
        } else {
          console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
          );
        }
      });    
}) 
  
redis.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
    messagesfromredis.push(message)
    processEvent(channel, message)
});

const processEvent = (channel, message) =>{
  const msgProcessor = require('./server/handleMessages')
  msgProcessor.processMessage(channel, message)
}

app.get("/",(req,res) =>{
    res.send(messagesfromredis)
})

app.listen(process.env.PORT, () =>{
    console.log("app is running on port",process.env.PORT)
})

