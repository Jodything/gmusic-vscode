import { workspace } from 'vscode';

function getConfig() {
	return workspace.getConfiguration('gmusic');
}

export function getAPIKey():string {
	return getConfig().get<string>('apiKey');
}

export function updateAPIKey(result: string) {
	console.log('incoming result: ' + result);
	if (result) {
		getConfig().update('apiKey', result);
	}
}