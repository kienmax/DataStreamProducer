const faker = require("faker");
const moment = require("moment");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const kinesis = new AWS.Kinesis();
const randomPartition = [
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
  "P8",
  "P9",
  "P10",
];

setInterval(async () => {
  try {
    const Records = [];
    for (let i = 0; i < 10; i++) {
      const data = await generateNotesItem();
      Records.push({
        Data:
          Buffer.from(JSON.stringify(data)) ||
          "STRING_VALUE" /* required */ /* Strings will be Base-64 encoded on your behalf */,
        PartitionKey:
          randomPartition[
            Math.floor(Math.random() * randomPartition.length)
          ] /* required */,
      });
    }
    console.log(Records);

    const params = {
      Records,
      StreamName: "DS1" /* required */,
    };
    const response = await kinesis.putRecords(params).promise();

    console.log("Records:", Records);
    console.log("Response:", response);
    console.log();
  } catch (err) {
    throw err;
  }
}, 1);

// setInterval(async () => {
//   try {
//     const data = await generateNotesItem();
//     const params = {
//       Data:
//         Buffer.from(JSON.stringify(data)) ||
//         "STRING_VALUE" /* required */ /* Strings will be Base-64 encoded on your behalf */,
//       PartitionKey: "P1" /* required */,
//       StreamName: "DS1" /* required */,
//     };
//     const response = await kinesis.putRecord(params).promise();
//     console.log("Data:", data);
//     console.log("Response:", response);
//     console.log();
//   } catch (err) {
//     throw err;
//   }
// }, 100);

generateNotesItem = async () => {
  return {
    user_id: faker.random.uuid(),
    timestamp: moment().unix(),
    cat: faker.random.word(),
    title: faker.company.catchPhrase(),
    content: faker.hacker.phrase(),
    note_id: faker.random.uuid(),
    user_name: faker.internet.userName(),
    expires: moment().unix() + 600,
  };
};
