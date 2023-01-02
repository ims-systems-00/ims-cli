const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');
const keytar = require('keytar');
async function _configureDefaults() {
	try {
		await keytar.setPassword(
			process.env.SERVICE,
			process.env.DB,
			'mongodb://localhost:27017'
		);
		await keytar.setPassword(
			process.env.SERVICE,
			process.env.ARCHIVE,
			__dirname + '/dump'
		);
	} catch (err) {
		console.log(err);
	}
}
module.exports = ({ clear = true }) => {
	unhandled();
	_configureDefaults();
	welcome({
		title: `ims-manual-test-helper`,
		tagLine: `by Riadhossain43`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
};
