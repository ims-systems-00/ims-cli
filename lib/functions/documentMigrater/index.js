async function startLocalDocumentMigration() {
	const { configureEnv } = require('./configEnvironment');
	configureEnv();
	const { colors } = require('../../colors');
	const { login, logout } = require('./services');
	const { startParameterValidations } = require('./validations');
	const { processNode } = require('./processNode');
	const prompt = require('prompt-sync')();
	try {
		const valid = await startParameterValidations();
		if (valid) {
			await login();
			console.log(
				'Contents of the directory: ',
				global.environmentVars.LOCAL_DATA_PATH
			);
			await processNode(
				global.environmentVars.LOCAL_DATA_PATH,
				global.environmentVars.TARGET_NODE || null
			);
			await logout();
		} else {
			console.log(
				colors.yellow,
				'Skipping upload process.',
				colors.reset
			);
		}
	} catch (err) {
		console.error(err.message);
		console.log(err);
	}
	do {} while (
		prompt("Please type 'exit' to end this programme: ") !== 'exit'
	);
}
module.exports = {
	startLocalDocumentMigration
};
