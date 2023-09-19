const prompt = require("prompt-sync")();
const configuration = {
  SERVER: "",
  TENANT: "",
  USER_EMAIL: "",
  USER_PASSWORD: "",
  REPORT_PATH: "",
  LOCAL_DATA_PATH: "",
  TARGET_REPOSITORY: "",
  TARGET_NODE: "",
};
function configure() {
  do {
    const server = prompt("Server address: ");
    configuration.SERVER = server;
    const tenant = prompt("Tenant: ");
    configuration.TENANT = tenant;
    const userEmail = prompt("User email: ");
    configuration.USER_EMAIL = userEmail;
    const userPassword = prompt("User password: ");
    configuration.USER_PASSWORD = userPassword;
    const localDataPath = prompt("Local data path: ");
    configuration.LOCAL_DATA_PATH = localDataPath;
    const targetRepository = prompt("Target repository: ");
    configuration.TARGET_REPOSITORY = targetRepository;
    const targetNode = prompt("Target node: ");
    configuration.TARGET_NODE = targetNode;
    // const reportPath = prompt("Report path: ");
    // configuration.REPORT_PATH = reportPath;
  } while (prompt("Please confirm (y/n): ") !== "y");
  global.environmentVars = { ...configuration };
}
module.exports = { configureEnv: configure };
