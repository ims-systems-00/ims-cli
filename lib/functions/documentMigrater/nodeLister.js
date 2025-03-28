const { listNodes } = require('./services');

function buildQuery(parentNode = null, page = 1) {
	return `deleteMarker[status]=false&status=Published&parentNode=${
		parentNode || null
	}&sort=-type%20name&page=${page}&size=30`;
}

async function loadAvailableContentsOfThisFolderFromTheServer(
	parentNode = null,
	page = 1
) {
	const nodes = [];
	while (true) {
		const data = await load(parentNode, page);
		nodes.push(...data.nodes);
		if (data.pagination.hasNextPage) {
			page = data.pagination.nextPage;
		} else break;
	}
	return nodes;
}
async function load(parentNode = null, page = 1) {
	try {
		let data = await listNodes(buildQuery(parentNode, page));
		return data;
	} catch (err) {
		console.error(err.message);
		console.log(err);
	}
}
module.exports = {
	loadAvailableContentsOfThisFolderFromTheServer
};
