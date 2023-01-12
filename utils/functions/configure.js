const keytar = require('keytar');
const config = require('../config.json');
const getSecrets = require('../getSecrets');
async function dbUri({ dbUri, checkSecrets }) {
	if (dbUri) {
		try {
			await keytar.setPassword(
				config.service,
				config.db,
				dbUri.toString()
			);
			console.log(
				await keytar.getPassword(config.service, config.db),
				'configured for manipulation'
			);
		} catch (err) {
			console.log(err);
		}
	}
	if (checkSecrets) {
		try {
			let secrets = await getSecrets();
			Object.keys(secrets).forEach(key => {
				let ends = secrets[key]
					.toString()
					.slice(0, secrets[key].length - 5);
				console.log(
					new Array(ends.length + 1).join('*') +
						secrets[key]
							.toString()
							.slice(ends.length, secrets[key].length)
				);
			});
		} catch (err) {
			console.log(err);
		}
	}
}
module.exports = {
	dbUri
};
