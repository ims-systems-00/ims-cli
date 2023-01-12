const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `--------------------------
Clear the console.
`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `--------------------------
Don't clear the console.
`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `--------------------------
Print debug info.
`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `--------------------------
Print CLI version.
`
	},
	orgName: {
		type: `string`,
		desc: `--------------------------
Organisation that will be worked by iMS Database admins.
`
	},
	torgName: {
		type: `string`,
		desc: `--------------------------
Name for target orgaanisation.
`
	},
	dbUri: {
		type: `string`,
		default: ``,
		desc: `--------------------------
Database uri for working environment.
`
	},
	sName: {
		type: `string`,
		default: ``,
		desc: `--------------------------
Snaphot name to work with.
`
	},
	checkSecrets: {
		type: `boolean`,
		default: false,
		desc: `--------------------------
Checks the secrets.
`
	}
};

const commands = {
	help: {
		desc: `--------------------------
Print help information
`
	},
	config: {
		desc: `--------------------------
Configuration of the cli.
`
	},
	snapshot: {
		desc: `--------------------------
Snapshots current state of an organisation.
e.g. imsmt snapshot --orgName=some_organame --sName=some_snap_name
`
	},
	loadsnap: {
		desc: `--------------------------
Loads a snapshot of an organisation to new organisation. You need to supply three options
to replicate the snapshot into targeted place.
e.g. imsmt loadsnapshot --orgName=some_organame --sName=some_snap_name --torgName=target_orgname
`
	},
	listsnap: {
		desc: `--------------------------
Lists all taken snapshots. e.g. imsmt listsnap
`
	},
	clearsnap: {
		desc: `--------------------------
Clears all the taken snapshots. Supply --sName option if a specefic
snap delete is required e.g. imsmt clearnsap --sName="some_snap_name,anther_snap_name"
`
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
