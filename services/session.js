const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

async function saveSession(id, data) {
  await redis.set(`session:${id}`, JSON.stringify(data), 'EX', 600); // 10 min expiry
}

async function getSession(id) {
  const raw = await redis.get(`session:${id}`);
  return raw ? JSON.parse(raw) : null;
}

async function updateSession(id, data) {
  await redis.set(`session:${id}`, JSON.stringify(data), 'EX', 600);
}

async function removeSession(id) {
  await redis.del(`session:${id}`);
}

module.exports = {
  saveSession,
  getSession,
  updateSession,
  removeSession
};
