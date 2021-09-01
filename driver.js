"use strict";
const { Consumer } = require("sqs-consumer");

const app = Consumer.create({
  queueUrl: "https://sqs.us-east-1.amazonaws.com/292438359159/lap19Queu",
  handleMessage: async (message) => {
    const customerOrder = JSON.parse(JSON.parse(message.Body).Message);
    console.log("Picked up", customerOrder);
    setTimeout(async () => {
      console.log(`Delivered ${customerOrder.orderId}`);
    }, 5000);
  },
  pollingWaitTimeMs: 2000,
});

app.start();
