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
	dbsnapshot,
	loadsnapshot,
	listsnapshots,
	clearsnapshots,
	dbUri
} = require('./utils/functions');
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`config`) &&
		dbUri({
			dbUri: flags.dbUri
		});
	input.includes(`snapshot`) &&
		dbsnapshot({
			orgName: flags.orgName,
			sName: flags.sName
		});
	input.includes(`loadsnap`) &&
		loadsnapshot({
			orgName: flags.orgName,
			sName: flags.sName,
			torgName: flags.torgName
		});
	input.includes(`listsnap`) && listsnapshots();
	input.includes(`clearsnap`) && clearsnapshots({ sName: flags.sName });
	debug && log(flags);
})();