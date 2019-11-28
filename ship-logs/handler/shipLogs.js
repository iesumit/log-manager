"use strict";

const { processAll } = require("../lib");
let { decode } = require("../lib");

exports.handler = async event => {
  const logEvent = await decode(event.awslogs.data);
  await processAll(logEvent.logGroup, logEvent.logStream, logEvent.logEvents);
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
