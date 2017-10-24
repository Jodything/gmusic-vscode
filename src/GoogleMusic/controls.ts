import { window, StatusBarAlignment, StatusBarItem, extensions } from 'vscode';
import { Command } from '../Commands/command';

export class Controls {

	private _buttons: Button[];
	private _songStatusbar: StatusBarItem;

	constructor() {
		this.createButtons();
	}

	updateTrackInfo(payload: trackData) {
		if (!this._songStatusbar) {
			this._songStatusbar = window.createStatusBarItem(StatusBarAlignment.Left, 10);
		}
		var text = `${payload.artist} - ${payload.title} (${payload.album})`;
		this._songStatusbar.text = text;
		this._songStatusbar.color = '#ff5722';
		this._songStatusbar.show();
	}

	createButtons() {
		var buttonsInfo = [
			{ id: 'nextTrack', text: '$(chevron-right)', buttonPriority: 0 },
			{ id: 'playPause', text: '$(triangle-right)', buttonPriority: 1 },
			{ id: 'prevTrack', text: '$(chevron-left)', buttonPriority: 2 },
			{ id: 'decreaseVolume', text: '$(chevron-down)', buttonPriority: 3 },
			{ id: 'increaseVolume', text: '$(chevron-up)', buttonPriority: 4 }
		];

		const extension = extensions.getExtension('Jodything.gmusic-vscode');
		if (!extension) {
			this._buttons = [];
			return;
		}

		var commands: { command: string, title: string }[] = extension.packageJSON.contributes.commands;
		this._buttons = buttonsInfo.map((item) => {
			const buttonName = item.id + 'Button';
			const buttonCommand = 'gmusic.' + item.id;
			const buttonPriority = item.buttonPriority;
			const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, buttonPriority);
			const { title } = commands.filter((command) => { return command.command === buttonCommand })[0] || { title: '' };
			statusBarItem.text = item.text;
			statusBarItem.command = buttonCommand;
			statusBarItem.color = '#ff5722';
			statusBarItem.tooltip = title;

			return Object.assign({}, item, { buttonName, buttonCommand, buttonPriority, statusBarItem });
		});
	}

	showVisible() {
		this._buttons.forEach((button) => { button.statusBarItem.show() });
	}
}


export interface Button {
	id: string,
	text: string,
	buttonName: string,
	buttonCommand: string,
	buttonPriority: number,
	statusBarItem: StatusBarItem
}

export interface trackData {
	title: string,
	artist: string,
	album: string,
	albumArt: string
}