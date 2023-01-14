#!/usr/bin/env node

/**
 * ims-manual-test-helper
 * this cli is created for automating various tasks for ims-systems-uat-tests
 *
 * @author Riadhossain43 <https://github.com/RiadHossain43>
 */
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const {
	takesnapshot,
	loadsnapshot,
	listsnapshots,
	clearsnapshots,
	configure
} = require('./utils/functions');
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
	cli.showHelp(0);
	debug && log(flags);
})();
