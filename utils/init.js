const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');
const keytar = require('keytar');
const config = require('./config.json');
async function _configureDefaults() {
	try {
		await keytar.setPassword(
			config.service,
			config.archive,
			__dirname + '/dump'
		);
	} catch (err) {
		console.log(err);
	}
}
_configureDefaults();
module.exports = ({ clear = true }) => {
	unhandled();
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