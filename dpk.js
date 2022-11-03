const crypto = require("crypto");

exports.deterministicPartitionKey = (e) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (e && e?.partitionKey) {
    const field = JSON.stringify(e);
    candidate = e.partitionKey
      ? e.partitionKey
      : crypto.createHash("sha3-512").update(field).digest("hex");
  } else {
    return TRIVIAL_PARTITION_KEY;
  }

  if (typeof candidate !== "string") candidate = JSON.stringify(candidate);
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash("sha3-512").update(candidate).digest("hex")
    : candidate;
};
