"use strict";

const AWS=require('aws-sdk');
const faker=require('faker');
const {Consumer}=require('sqs-consumer');

AWS.config.update({region: 'us-east-1'});

const sns=new AWS.SNS();
const arn='arn:aws:sns:us-east-1:292438359159:lap19';
const vendorId='vendor';

setInterval(()=>{
    const customerOrder={
        orderId:faker.datatype.uuid(),
        customer:faker.name.findName(),
        address:faker.address.streetAddress(),
        vendorId:vendorId
    };

    const params={
        Message:JSON.stringify(customerOrder),
        TopicArn:arn
    }
    // console.log(payload);
    sns.publish(params).promise().then(res=>{
        console.log('Pickup order',res);
    }).catch(error=>{
        console.error(error.message);
    });
},Math.floor(Math.random()*1000));

const app=Consumer.create({
    queueUrl:`https://sqs.us-east-1.amazonaws.com/292438359159/lap19Queu`,
    handleMessage:async(message)=>{
        console.log("Delivered:",message.Body);
    },
    pollingWaitTimeMs:20000
},5000);

app.start();