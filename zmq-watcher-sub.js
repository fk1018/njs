'use strict';
const zmq = require('zmq');
//subscriber endpoint
const subscriber = zmq.socket('sub');
//subscribe to all messages
subscriber.subscribe('');
//handle messages from publishers
subscriber.on('message',(data)=>{
    let message =  JSON.parse(data)
    let date = new Date(message.timestamp);
    console.log(`File ${message.file} changed at ${date}`);
})
//connect to publishers
subscriber.connect('tcp://localhost:5432');