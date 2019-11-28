"use strict";

let { decode } = require("../lib");

exports.handler = async event => {
  console.log(event.awslogs.data);
  const logEvent = await decode(event.awslogs.data);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event
      },
      null,
      2
    )
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
