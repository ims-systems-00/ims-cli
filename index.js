#!/usr/bin/env node

/**
 * ims-manual-test-helper
 * this cli is created for automating various tasks for ims-systems-uat-tests
 *
 * @author Riadhossain43 <https://github.com/RiadHossain43>
 */
global.environmentVars = {};
const init = require('./lib/init');
const cli = require('./lib/cli');
const log = require('./lib/log');
const {
	takesnapshot,
	loadsnapshot,
	listsnapshots,
	clearsnapshots,
	configure,
	startLocalDocumentMigration
} = require('./lib/functions');
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	if (input.includes(`config`)) {
		return configure({
			dbUri: flags.dbUri,
			check: flags.check,
			archivePath: flags.archivePath
		});
	}
	if (input.includes(`snapshot`)) {
		if (input.includes(`take`)) {
			return takesnapshot({
				orgName: flags.orgName,
				sName: flags.sName
			});
		}
		if (input.includes(`load`)) {
			return loadsnapshot({
				orgName: flags.orgName,
				sName: flags.sName,
				torgName: flags.torgName
			});
		}
		if (input.includes(`list`)) {
			return listsnapshots();
		}
		if (input.includes(`clear`)) {
			return clearsnapshots({ sName: flags.sName });
		}
	}
	if (input.includes(`migratedocs`)) {
		return startLocalDocumentMigration();
	}
	cli.showHelp(0);
	debug && log(flags);
})();
