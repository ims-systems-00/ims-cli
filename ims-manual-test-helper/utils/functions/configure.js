const keytar = require('keytar');
const config = require('../config.json');
async function dbUri({ dbUri }) {
	try {
		await keytar.setPassword(config.service, config.db, dbUri);
		console.log(await keytar.getPassword(config.service, config.db), 'configured for manipulation');
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	dbUri
};
