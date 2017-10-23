import { commands, Disposable, ExtensionContext, window } from 'vscode';
import { Connect } from './GoogleMusic/connect';
import { createCommands} from './Commands/createCommands';

export function activate(context: ExtensionContext) {
	
    console.info('Congratulations, your extension "gmusic-vscode" is now active!');
	context.subscriptions.push(createCommands());
}

// this method is called when your extension is deactivated
export function deactivate() {
	// Connect.closeConneciton();
}