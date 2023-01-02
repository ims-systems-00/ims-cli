const { spawn } = require('child_process');
async function runCommand(...args) {
	return new Promise((resolve, reject) => {
		const now = new Date();
		const child = spawn(...args);
		child.stderr.on('data', data => {
			console.info(Buffer.from(data).toString());
		});
		child.stdout.on('data', data =>
			console.info(Buffer.from(data).toString())
		);
		child.on('error', error => {
			console.error('error:', error);
			reject(error);
		});
		child.on('exit', (code, signal) => {
			if (code) {
				const failureMessage = 'Process exited with code' + code;
				console.error(failureMessage);
				reject(failureMessage);
			} else if (signal) {
				const failureMessage = 'Process killed with signal' + signal;
				console.error(failureMessage);
				reject(failureMessage);
			} else {
				const successMessage = 'command execution success.';
				console.log(successMessage);
				resolve(successMessage);
			}
		});
	});
}

module.exports = {
	runCommand
};
