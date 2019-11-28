"use strict";
const zlib = require("zlib");
const parse = require("./parse");

const cloudWatchEncoding = "base64";
const payloadEncoding = "utf8";

const host = process.env.logstash_host;
const port = process.env.logstash_port;
const token = process.env.token;

const processAll = function(logGroup, logStream, logEvents) {
  const lambdaVersion = parse.lambdaVersion(logStream);
  const functionName = parse.functionName(logGroup);
  for (const logEvent of logEvents) {
    const log = parse.logMessage(logEvent);
    console.log(log);
  }
};

const decode = function(data) {
  const compressedPayload = Buffer.from(data, cloudWatchEncoding);
  const jsonPayload = zlib
    .gunzipSync(compressedPayload)
    .toString(payloadEncoding);
  return JSON.parse(jsonPayload);
};

module.exports = {
  processAll,
  decode
};
