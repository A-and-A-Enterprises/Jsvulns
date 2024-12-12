// This is the server application that will provide the backend API for the bookstore
// it will connect with the specified database as per environment variables.

// For development purposes there is also the .env file that will provide database
// default values.

// In testing scenarios, the in memory database is preferred so that the tests are simple to execute and data to populates

const Server = require('./src/server');

async function main() {
  const server = new Server();
  await server.initialize();
  server.start();

  // capture ctrl-c and exit normally after stopping the server
  process.on('SIGINT', () => {
    server.stop();
    process.exit();
  });
}

main();