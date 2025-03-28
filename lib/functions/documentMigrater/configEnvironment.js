const { colors } = require('../../colors');

const prompt = require('prompt-sync')();
const configuration = {
	SERVER: '',
	TENANT: '',
	USER_EMAIL: '',
	USER_PASSWORD: '',
	REPORT_PATH: '',
	LOCAL_DATA_PATH: '',
	TARGET_REPOSITORY: '',
	TARGET_NODE: ''
};
function configure() {
	let confirmation = '';
	while (true) {
		if (!confirmation) {
			const server = prompt('Server address: ');
			configuration.SERVER = server;
			const tenant = prompt('Tenant: ');
			configuration.TENANT = tenant;
			const userEmail = prompt('User email: ');
			configuration.USER_EMAIL = userEmail;
			const userPassword = prompt('User password: ');
			configuration.USER_PASSWORD = userPassword;
			const localDataPath = prompt('Local data path: ');
			configuration.LOCAL_DATA_PATH = localDataPath;
			const targetRepository = prompt('Target repository: ');
			configuration.TARGET_REPOSITORY = targetRepository;
			const targetNode = prompt('Target node: ');
			configuration.TARGET_NODE = targetNode;
		}
		// const reportPath = prompt("Report path: ");
		// configuration.REPORT_PATH = reportPath;
		confirmation = prompt('Please confirm (y/n): ');
		if (confirmation === 'y') break;
		if (confirmation === 'n') {
			console.log(
				colors.bright,
				'Parameters not configured. Exit process.',
				colors.reset
			);
			process.exit(0);
		}
	}
	global.environmentVars = { ...configuration };
}
module.exports = { configureEnv: configure };
