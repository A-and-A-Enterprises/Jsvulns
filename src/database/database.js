// A flag that is read as to switching between an in memory or external postgres database
const IN_MEMORY = process.env.IN_MEMORY_DATABASE == 'true';

module.exports.getDatabase = () => {
  if (IN_MEMORY) {
    const memory = require('./in-memory');
    return memory.getDatabase();
  } else {
    const postgres = require('./postgres');
    return postgres.getDatabase();
  }
}