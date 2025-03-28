const keytar = require('keytar');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const getSecrets = require('../getSecrets');
const chalk = require('chalk');
async function configure({ dbUri, check, archivePath }) {
	if (dbUri) {
		try {
			await keytar.setPassword(
				config.service,
				config.db,
				dbUri.toString()
			);
			console.log(
				chalk.cyan(await keytar.getPassword(config.service, config.db)),
				'configured for manipulation\n'
			);
		} catch (err) {
			console.log(chalk.red(err.message));
			console.log(err);
		}
	}
	if (check) {
		try {
			let secrets = await getSecrets();
			Object.keys(secrets).forEach(key => {
				let ends = secrets[key]
					.toString()
					.slice(0, secrets[key].length - 5);
				console.log(
					chalk.cyanBright(
						new Array(ends.length + 1).join('*') +
							secrets[key]
								.toString()
								.slice(ends.length, secrets[key].length)
					)
				);
			});
		} catch (err) {
			console.log(chalk.red(err.message));
			console.log(err);
		}
	}
	if (archivePath) {
		try {
			let currentArchivePath = await keytar.getPassword(
				config.service,
				config.archive
			);
			if (
				currentArchivePath !== archivePath &&
				fs.existsSync(currentArchivePath)
			) {
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
					chalk.cyan(
						await keytar.getPassword(config.service, config.archive)
					),
					'configured for storing snapshots\n'
				);
			}
		} catch (err) {
			console.log(chalk.red(err.message));
			console.log(err);
		}
	}
}
module.exports = {
	configure
};
