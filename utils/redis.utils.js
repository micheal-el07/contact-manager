const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.error("Redis client error:", err);
});

redisClient.on("ready", () => {
  console.log("Redis client ready");
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
