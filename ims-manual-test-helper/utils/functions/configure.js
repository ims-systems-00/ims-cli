const keytar = require('keytar');
const config = require('../config.json');
async function dbUri({ dbUri }) {
	try {
		await keytar.setPassword(config.service, config.db, dbUri);
		console.log(dbUri, 'configured for manipulation');
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	dbUri
};
