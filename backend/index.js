require("dotenv").config();

const port = process.env.PORT || 9000;
const server = require("./server");

startServer().catch(handleStartupError);

async function startServer() {
  return new Promise((resolve, reject) => {
    server.listen(port, logStartup);

    function logStartup() {
      console.log(`Started on port ${port}`);
      resolve();
    }
  });
}

function handleStartupError(err) {
  // eslint-disable-next-line no-console
  console.error("DB Connection error", err);
  process.exit(1);
}
