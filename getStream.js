const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const kinesis = new AWS.Kinesis();

const streamDescription = {
  StreamDescription: {
    StreamName: "DS1",
    StreamARN: "arn:aws:kinesis:us-east-1:180470132809:stream/DS1",
    StreamStatus: "ACTIVE",
    Shards: [
      {
        ShardId: "shardId-000000000000",
        HashKeyRange: {
          StartingHashKey: "0",
          EndingHashKey: "340282366920938463463374607431768211455",
        },
        SequenceNumberRange: {
          StartingSequenceNumber:
            "49610014252742248407930735885136442016014564637181739010",
        },
      },
    ],
    HasMoreShards: false,
    RetentionPeriodHours: 24,
    StreamCreationTimestamp: "2020-08-20T10:41:46.000Z",
    EnhancedMonitoring: [
      {
        ShardLevelMetrics: [],
      },
    ],
    EncryptionType: "NONE",
  },
};

describeStream = async () => {
  var params = {
    StreamName: "DS1" /* required */,
    // ExclusiveStartShardId: 'STRING_VALUE',
    // Limit: 'NUMBER_VALUE'
  };
  const result = await kinesis.describeStream(params).promise();
  console.log(JSON.stringify(result, null, 2));
};

describeStreamConsumer = async () => {
  var params = {
    // ConsumerARN: "STRING_VALUE",
    // ConsumerName: "STRING_VALUE",
    StreamARN: "arn:aws:kinesis:us-east-1:180470132809:stream/DS1",
  };
  const result = await kinesis.describeStreamConsumer(params).promise();
  console.log(JSON.stringify(result, null, 2));
};

describeStreamSummary = async () => {
  var params = {
    StreamName: "DS1",
  };
  const result = await kinesis.describeStreamSummary(params).promise();
  console.log(JSON.stringify(result, null, 2));
};

// {
//     "ShardIterator": "AAAAAAAAAAEFgBN8DGCYYvp7Z9m74xd//4/YwjcSwK/98T1xL4jUNv8Et3LX8brwgNxKquoXTflFHQKRlgaTIZH3pcar2xYTxL398A4UQJ9wkJxEpGTD2cCxv1v9/JJ/TPo/+nIYpvXqc5Y4x+Hz7wSLjAhCDJ9VNrfIwd+6D53JH8Nl7E29WCjoJJjkHSzqCCXfw8OX3zVnXMpRwiH6HQvg6526k0bl"
//   }
getShardIterator = async () => {
  var params = {
    ShardId: "shardId-000000000000" /* required */,
    ShardIteratorType: "TRIM_HORIZON",
    //   AT_SEQUENCE_NUMBER |
    //   AFTER_SEQUENCE_NUMBER |
    //   TRIM_HORIZON |
    //   LATEST |
    //   AT_TIMESTAMP /* required */,
    StreamName: "DS1" /* required */,
    // StartingSequenceNumber: "STRING_VALUE",
    // Timestamp:
    //   new Date() || "Wed Dec 31 1969 16:00:00 GMT-0800 (PST)" || 123456789,
  };
  const result = await kinesis.getShardIterator(params).promise();
  console.log(JSON.stringify(result, null, 2));
};

getRecords = async () => {
  var params = {
    ShardIterator:
      "AAAAAAAAAAEFgBN8DGCYYvp7Z9m74xd//4/YwjcSwK/98T1xL4jUNv8Et3LX8brwgNxKquoXTflFHQKRlgaTIZH3pcar2xYTxL398A4UQJ9wkJxEpGTD2cCxv1v9/JJ/TPo/+nIYpvXqc5Y4x+Hz7wSLjAhCDJ9VNrfIwd+6D53JH8Nl7E29WCjoJJjkHSzqCCXfw8OX3zVnXMpRwiH6HQvg6526k0bl" /* required */,
    Limit: "100",
  };
  const result = await kinesis.getRecords(params).promise();
  console.log(JSON.stringify(result, null, 2));
};

listShards = async () => {
  var params = {
    // ExclusiveStartShardId: "STRING_VALUE",
    // MaxResults: "NUMBER_VALUE",
    // NextToken: "STRING_VALUE",
    // ShardFilter: {
    //   Type:
    //     AFTER_SHARD_ID |
    //     AT_TRIM_HORIZON |
    //     FROM_TRIM_HORIZON |
    //     AT_LATEST |
    //     AT_TIMESTAMP |
    //     FROM_TIMESTAMP /* required */,
    //   ShardId: "STRING_VALUE",
    //   Timestamp:
    //     new Date() || "Wed Dec 31 1969 16:00:00 GMT-0800 (PST)" || 123456789,
    // },
    // StreamCreationTimestamp:
    //   new Date() || "Wed Dec 31 1969 16:00:00 GMT-0800 (PST)" || 123456789,
    StreamName: "DS1",
  };
  const result = await kinesis.listShards(params).promise();
  console.log(JSON.stringify(result, null, 2));
};

getInfo = async () => {
  var params = {
    ShardIterator: "STRING_VALUE" /* required */,
    // Limit: "NUMBER_VALUE",
  };
  const result = await kinesis.getRecords().promise();
  console.log(JSON.stringify(result, null, 2));
};

//describeStream();
// describeStreamConsumer();
//describeStreamSummary();
// getRecords();
// getShardIterator();
listShards();
