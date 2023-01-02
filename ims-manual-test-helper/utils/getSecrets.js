const keytar = require('keytar');
const config = require('./config.json');
module.exports = async () => {
	let clusteruri = await keytar.getPassword(config.service, config.db);
	let archivepath = await keytar.getPassword(config.service, config.archive);
	return {
		clusteruri,
		archivepath
	};
};
