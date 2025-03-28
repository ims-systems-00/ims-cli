const axios = require('axios');
const fs = require('fs');
const API_VERSION = '/api/v3';
const httpRequest = new axios.Axios({
	withCredentials: true,
	baseURL: global.environmentVars.SERVER,
	headers: {
		common: {
			'x-org-id': global.environmentVars.TENANT
		}
	}
});
const httpFileUploader = new axios.Axios({});

exports.login = async function () {
	const response = await httpRequest.post(
		API_VERSION + '/auth',
		JSON.stringify({
			email: global.environmentVars.USER_EMAIL,
			password: global.environmentVars.USER_PASSWORD
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	console.log('Login: ', response.status);
	console.log('Login Response: ', response);
	let { data } = response;
	data = JSON.parse(data);
	httpRequest.defaults.headers.common['x-auth-accesstoken'] =
		data.accessToken;
	httpRequest.defaults.headers.common['x-auth-refreshtoken'] =
		data.refreshToken;
	const refreshResponse = await httpRequest.post(
		API_VERSION + '/auth/refresh-token'
	);
	console.log('Refresh: ', refreshResponse.status);
	data = JSON.parse(refreshResponse.data);
	httpRequest.defaults.headers.common['x-auth-accesstoken'] =
		data.accessToken;
	httpRequest.defaults.headers.common['x-auth-refreshtoken'] =
		data.refreshToken;
	return JSON.parse(refreshResponse.data);
};
exports.logout = async function () {
	const response = await httpRequest.delete(API_VERSION + '/auth');
	console.log('Logout: ', response.status);
	delete httpRequest.defaults.headers.common['x-auth-accesstoken'];
	delete httpRequest.defaults.headers.common['x-auth-refreshtoken'];
	return JSON.parse(response.data);
};
exports.createFolder = async function (data) {
	const response = await httpRequest.post(
		`${API_VERSION}/document-repositories/${global.environmentVars.TARGET_REPOSITORY}/folder-nodes`,
		JSON.stringify({
			name: data.name,
			parentNode: data.parentNode || null,
			data: {}
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	return JSON.parse(response.data);
};
exports.listNodes = async function (query = '') {
	const response = await httpRequest.get(
		`${API_VERSION}/document-repositories/${global.environmentVars.TARGET_REPOSITORY}/nodes?` +
			query,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	return JSON.parse(response.data);
};
exports.getRepository = async function () {
	const response = await httpRequest.get(
		`${API_VERSION}/document-repositories/${
			global.environmentVars.TARGET_REPOSITORY || null
		}`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	console.log('Repository: ', response.status);
	return JSON.parse(response.data);
};
exports.getNode = async function () {
	const response = await httpRequest.get(
		`${API_VERSION}/document-repositories/${global.environmentVars.TARGET_REPOSITORY}/nodes/${global.environmentVars.TARGET_NODE}`,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	console.log('Node: ', response.status);
	return JSON.parse(response.data);
};
const uploadFiles = async function (fileData) {
	try {
		let { data: uploadInfo } = await httpRequest.get(
			`${API_VERSION}/files/signed-url/uploads`,
			{
				headers: {
					'x-file-key': encodeURI(fileData.fileName),
					'x-file-path': encodeURI('general'),
					'x-file-public': encodeURI(null)
				}
			}
		);
		uploadInfo = JSON.parse(uploadInfo);
		await httpFileUploader.put(
			uploadInfo.url,
			fs.readFileSync(fileData.filePath)
		);
		return uploadInfo;
	} catch (err) {
		console.error(err.message);
		console.log(err);
	}
};
exports.createFile = async function (data) {
	const uploadResponse = await uploadFiles(data);
	const response = await httpRequest.post(
		`${API_VERSION}/document-repositories/${global.environmentVars.TARGET_REPOSITORY}/file-nodes`,
		JSON.stringify({
			parentNode: data.parentNode,
			data: [
				{
					storageInfo: uploadResponse.uploadInformation,
					purpose: 'Document',
					applicableModules: [],
					authorisation: []
				}
			]
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const { data: fileData } = response;
	return JSON.parse(fileData);
};
exports.uploadFiles = uploadFiles;
