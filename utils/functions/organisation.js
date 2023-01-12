const path = require('path');
const fs = require('fs');
const { runCommand } = require('../runCommand');
const getsecrets = require('../getSecrets');
const moment = require('moment/moment');
const snapshotmatch = /[.]gzip$/;
async function dbsnapshot({ orgName, sName }) {
	try {
		let secrets = await getsecrets();
		const ARCHIVE_PATH = path.join(
			secrets.archivepath,
			`/${sName || orgName + '-' + moment().format('DD-MM-YYYY')}.gzip`
		);
		await runCommand('mongodump', [
			`--uri=${secrets.clusteruri}`,
			`--db=${orgName}`,
			`--archive=${ARCHIVE_PATH}`,
			`--gzip`
		]);
		console.log('Snapshot take success');
	} catch (err) {
		console.log(err);
	}
}
async function loadsnapshot({ sName, orgName, torgName }) {
	try {
		let secrets = await getsecrets();
		const ARCHIVE_PATH = path.join(secrets.archivepath, `/${sName}.gzip`);
		await runCommand('mongorestore', [
			`--uri=${secrets.clusteruri}`,
			`--archive=${ARCHIVE_PATH}`,
			`--nsFrom=${orgName}.*`,
			`--nsTo=${torgName || orgName}.*`,
			'--gzip',
			'--drop'
		]);
		console.log('Snapshot load success');
	} catch (err) {
		console.log(err);
	}
}
async function listsnapshots() {
	try {
		let secrets = await getsecrets();
		fs.readdir(secrets.archivepath, (err, files) => {
			if (err) return console.log(err);
			files
				.filter(file => snapshotmatch.test(file))
				.forEach(file => {
					console.log(file);
				});
		});
	} catch (err) {
		console.log(err);
	}
}
async function clearsnapshots({ sName }) {
	try {
		let list = [];
		if (sName) list = sName.split(',').map(item => `${item}.gzip`);
		let secrets = await getsecrets();
		fs.readdir(secrets.archivepath, (err, files) => {
			if (err) return console.log(err);
			files
				.filter(file => snapshotmatch.test(file))
				.filter(file => {
					if (list.length) {
						return list.includes(file);
					} else return true;
				})
				.forEach(file => {
					fs.unlinkSync(secrets.archivepath + `/${file}`);
					console.log(file, '...cleared');
				});
		});
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	dbsnapshot,
	loadsnapshot,
	listsnapshots,
	clearsnapshots
};

// fs.readdirSync(path)
// 	.filter(f => regex.test(f))
// 	.map(f => fs.unlinkSync(path + f));
