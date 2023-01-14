const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `--------------------------
Clears the console.
`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `--------------------------
Doesn't clear the console.
`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `--------------------------
Prints debug info.
`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `--------------------------
Prints CLI version.
`
	},
	orgName: {
		type: `string`,
		desc: `--------------------------
Specifies organisation name to work with in various commands.
`
	},
	torgName: {
		type: `string`,
		desc: `--------------------------
Specifies target organisation name to work with in various commands.
`
	},
	dbUri: {
		type: `string`,
		default: ``,
		desc: `--------------------------
Specifies database environment to work with. It's used with config command.
`
	},
	sName: {
		type: `string`,
		default: ``,
		desc: `--------------------------
Specifies snaphot name to work with in various commands.
`
	},
	check: {
		type: `boolean`,
		default: false,
		desc: `--------------------------
Utilised for checking current config. Utilised with config command.
`
	},
	archivePath: {
		type: `string`,
		default: ``,
		desc: `--------------------------
Specifies the archive path or directory where the snapshots are stored.
`
	}
};

const commands = {
	help: {
		desc: `--------------------------
Prints help information
`
	},
	config: {
		desc: `--------------------------
Tells that we are working with the configuration of the cli.
`
	},
	snapshot: {
		desc: `--------------------------
Tells that we are working with snapshots of organisations.
e.g. ims snapshot
`
	},
	load: {
		desc: `--------------------------
Loads a snapshot of an organisation to new organisation. You need to use it along with 'snapshot' command and
supply three required options (--orgName --sName --torgName) to replicate the snapshot into targeted organisation.
e.g. ims snapshot load --orgName=some_organame --sName=some_snap_name --torgName=target_orgname
`
	},
	take: {
		desc: `--------------------------
Takes a snapshot of an organisation into your local machine. You need to use it along with 'snapshot' command. You
also need supply required flag --orgName. To optionally give a name to your snapshot you need to supply --sName flag.
e.g. ims snapshot take --orgName=some_organame --sName=some_snap_name
`
	},
	list: {
		desc: `--------------------------
Lists all taken snapshots. You need to use it along with 'snapshot' command.
e.g. ims snapshot list. No flag is supported as of now.
`
	},
	clear: {
		desc: `--------------------------
Clears all the taken snapshots. You need to use it along with 'snapshot' command. Supply --sName option 
if a specefic or a list of snapshosts delete functionality is required.
e.g. ims snapshot clear --sName="some_snap_name,anther_snap_name"
`
	}
};

const helpText = meowHelp({
	name: `ims`,
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
