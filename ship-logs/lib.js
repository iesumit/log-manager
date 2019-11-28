"use strict";
const zlib = require("zlib");
const parse = require("./parse");

const cloudWatchEncoding = "base64";
const payloadEncoding = "utf8";

const logger = require("logzio-nodejs").createLogger({
  token: process.env.logzio_token,
  protocol: "https",
  host: process.env.logzio_host,
  port: process.env.logzio_port
});
const processAll = function(logGroup, logStream, logEvents) {
  const lambdaVersion = parse.lambdaVersion(logStream);
  const functionName = parse.functionName(logGroup);
  for (const logEvent of logEvents) {
    const log = parse.logMessage(logEvent);
    if (log) {
      log.logStream = logStream;
      log.logGroup = logGroup;
      log.functionName = functionName;
      log.lambdaVersion = lambdaVersion;
      log.fields = log.fields || {};
      log.type = "cloudwatch";
      log.token = process.env.logzio_token;
    }
    logger.log(log);
  }
  logger.sendAndClose();
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
