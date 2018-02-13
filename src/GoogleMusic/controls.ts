import { window, StatusBarAlignment, StatusBarItem, extensions } from 'vscode';
import { isButtonVisible, getFontColor } from '../Config/gMusicConfig';

export class Controls {

	private _buttons: Button[];
	private _songStatusbar: StatusBarItem;
	private _textColor: string;
	private _actionCtrls: string;
	private _volCtrls: string;
	

	constructor() {
		this._actionCtrls = 'actionControls';
		this._volCtrls = 'volumeControls';
		this._textColor = getFontColor();
		this.createButtons();
	}

	updateTrackInfo(payload: trackData) {
		if (!this._songStatusbar) {
			this._songStatusbar = window.createStatusBarItem(StatusBarAlignment.Left, 10);
		}
		var text = `${payload.artist} - ${payload.title}`;
		if (isButtonVisible('album')) {
			text += ` (${payload.album})`;
		}
		this._songStatusbar.text = text;
		this._songStatusbar.color = this._textColor;
		this._songStatusbar.show();
	}

	createButtons() {
		var buttonsInfo = [
			{ id: 'nextTrack', text: '$(chevron-right)', buttonPriority: 0, group: this._actionCtrls },
			{ id: 'playPause', text: '$(triangle-right)', buttonPriority: 1, group: this._actionCtrls },
			{ id: 'prevTrack', text: '$(chevron-left)', buttonPriority: 2, group: this._actionCtrls },
			{ id: 'decreaseVolume', text: '$(chevron-down)', buttonPriority: 3, group: this._volCtrls },
			{ id: 'increaseVolume', text: '$(chevron-up)', buttonPriority: 4, group: this._volCtrls }
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
			const buttonVisible = isButtonVisible(item.group);
			const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, buttonPriority);
			const { title } = commands.filter((command) => { return command.command === buttonCommand })[0] || { title: '' };
			statusBarItem.text = item.text;
			statusBarItem.command = buttonCommand;
			statusBarItem.color = this._textColor;
			statusBarItem.tooltip = title;

			return Object.assign({}, item, { buttonName, buttonCommand, buttonPriority, statusBarItem, buttonVisible });
		});
	}

	showVisible() {
		this._buttons.forEach((button) => { button.buttonVisible && button.statusBarItem.show() });
	}
}


export interface Button {
	id: string,
	text: string,
	buttonName: string,
	buttonCommand: string,
	buttonPriority: number,
	statusBarItem: StatusBarItem,
	buttonVisible: boolean
}

export interface trackData {
	title: string,
	artist: string,
	album: string,
	albumArt: string
}