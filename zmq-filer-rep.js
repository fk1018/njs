'use strict';

const fs = require('fs');
const zmq = require('zmq');
const responder = zmq.socket('rep');//socket to reply to client requests

responder.on('message',(data)=>{
	
	let request = JSON.parse(data);

	console.log(`Received request to get: ${request.path}`);
	//responder read file and replies with conent
  try {
      fs.readFile(request.path,(err,content)=>{
        console.log('Sending response content');
        responder.send(JSON.stringify({
          content:content.toString(),
          timestamp: Date.now(),
          pid:process.pid
        }))
      });
  }catch(err){
    console.log('zzz');
  }
});

responder.bind('tcp://127.0.0.1:5433',(err)=>{
	console.log('Listening for zmq requesters');
});

process.on('SIGINT',()=>{
	console.log('Shutting down...');
	responder.close();
});