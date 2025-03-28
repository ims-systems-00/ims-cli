const { colors } = require('../../colors');
const { logout, login, getRepository, getNode } = require('./services');

async function startParameterValidations() {
	try {
		console.log('Validating inputs...');
		const loginData = await login();
		if (loginData.statusCode !== 200)
			throw new Error('Login validation failed.');
		const repoData = await getRepository();
		if (repoData.statusCode !== 200)
			throw new Error('Respository validation failed.');
		const nodeData = await getNode();
		if (nodeData.statusCode !== 200)
			throw new Error('Node validation failed.');
		const logoutData = await logout();
		if (logoutData.statusCode !== 200)
			throw new Error('Logout validation failed.');
		console.log(colors.green, 'Validation successfull...', colors.reset);
		return true;
	} catch (err) {
		console.error(err.message);
		console.log(err);
		console.log(colors.red, 'Parameter validation failed.', colors.reset);
		return false;
	}
}
module.exports = { startParameterValidations };
