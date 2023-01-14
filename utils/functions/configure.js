const keytar = require('keytar');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const getSecrets = require('../getSecrets');
async function dbUri({ dbUri, checkSecrets, archivePath }) {
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
	if (archivePath) {
		try {
			let currentArchivePath = await keytar.getPassword(
				config.service,
				config.archive
			);
			if (currentArchivePath !== archivePath) {
				fs.readdir(currentArchivePath, (err, files) => {
					if (err) return console.log(err);
					files.forEach(file => {
						// moves the files o destination...
						if (
							fs.existsSync(
								path.join(currentArchivePath + '/' + file)
							) &&
							!fs
								.lstatSync(
									path.join(currentArchivePath + '/' + file)
								)
								.isDirectory()
						)
							fs.rename(
								path.join(currentArchivePath + '/' + file),
								path.resolve(
									archivePath.toString(),
									path.basename(file)
								),
								err => {
									if (err) throw err;
								}
							);
					});
				});
				await keytar.setPassword(
					config.service,
					config.archive,
					archivePath.toString()
				);
				console.log(
					await keytar.getPassword(config.service, config.archive),
					'configured for storing snapshots'
				);
			}
		} catch (err) {
			console.log(err);
		}
	}
}
module.exports = {
	dbUri
};
