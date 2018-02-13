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

export function isButtonVisible(buttonGroup: string): boolean {
	return getConfig().get('show' + buttonGroup[0].toUpperCase() + buttonGroup.slice(1), true);
}

export function getFontColor():string {
	return getConfig().get<string>('color');
}