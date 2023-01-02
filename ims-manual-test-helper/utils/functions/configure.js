const keytar = require('keytar');
async function dbUri({ dbUri }) {
	try {
		await keytar.setPassword(process.env.SERVICE, process.env.DB, dbUri);
		console.log(dbUri, 'configured for manipulation');
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	dbUri
};
