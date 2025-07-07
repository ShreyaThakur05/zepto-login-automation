
const sessions = new Map();

function saveBrowserSession(sessionId, browser, page) {
  sessions.set(sessionId, { browser, page });
}

function getBrowserSession(sessionId) {
  return sessions.get(sessionId);
}

function removeBrowserSession(sessionId) {
  sessions.delete(sessionId);
}

module.exports = {
  saveBrowserSession,
  getBrowserSession,
  removeBrowserSession
};
