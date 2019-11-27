"use strict";
import zlib from "zlib";
import { functionName, lambdaVersion, parseLogMessage } from "parse";

const cloudWatchEncoding = "base64";
const payloadEncoding = "utf8";


const host = process.env.logstash_host;
const port = process.env.logstash_port;
const token = process.env.token;

export async function processAll(logGroup, logStream, logEvents) {
  const lambdaVersion = lambdaVersion(logStream);
  const functionName = functionName(logGroup);
}

export async function decode(data) {
  const compressedPayload = Buffer.from(data, cloudWatchEncoding);
  const jsonPayload = zlib
    .gunzipSync(compressedPayload)
    .toString(payloadEncoding);
  return JSON.parse(jsonPayload);
}
