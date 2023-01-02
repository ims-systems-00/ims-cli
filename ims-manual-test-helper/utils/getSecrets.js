const keytar = require("keytar")
module.exports= async ()=>{
	let clusteruri = await keytar.getPassword(
		process.env.SERVICE,
		process.env.DB
	);
	let archivepath = await keytar.getPassword(
		process.env.SERVICE,
		process.env.ARCHIVE
	);
	return {
		clusteruri,
		archivepath
	}
}