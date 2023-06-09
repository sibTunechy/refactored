const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let personalKey = event && event.partitionKey ? event.partitionKey : JSON.stringify(event || "");

  if (typeof personalKey !== "string") {
    personalKey = JSON.stringify(personalKey);
  }

  if (personalKey.length > MAX_PARTITION_KEY_LENGTH) {
    personalKey = crypto.createHash("sha3-512").update(personalKey).digest("hex");
  }

  return personalKey;
};