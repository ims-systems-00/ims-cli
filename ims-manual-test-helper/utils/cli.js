const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console.`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console.`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info.`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version.`
	},
	orgName: {
		type: `string`,
		alias: `on`,
		desc: `Organisation that has been saved by iMS Database admins.`
	},
	torgName: {
		type: `string`,
		alias: `ton`,
		desc: `Snapshotname for an orgaanisation.`
	},
	dbUri: {
		type: `string`,
		alias: `du`,
		default: `mongodb://localhost:27017`,
		desc: `Database uri for working environment.`
	}
};

const commands = {
	help: { desc: `Print help information` },
	config: { desc: `Configuration of the cli.` },
	snapshot: { desc: `Snapshots current state of an organisation.` },
	loadsnap: {
		desc: `Loads a snapshot of an organisation to new organisation.`
	},
	listsnap: {
		desc: `Lists all taken snapshots.`
	},
	clearsnap: {
		desc: `Clears all the taken snapshots. 
		Supply --sName if specefic snap delete is required e.g. --sName="some_snap_name,anther_snap_name"`
	}
};

const helpText = meowHelp({
	name: `imsmt`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
