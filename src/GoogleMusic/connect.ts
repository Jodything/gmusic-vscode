import { window } from 'vscode';
import { getAPIKey, updateAPIKey } from '../Config/gMusicConfig';
import { Controls } from './controls';

const socketPath = 'ws://localhost:5672';
const chokidar = require('chokidar');
const WebSocket = require('ws');


export class Connect {
	private _apiKey = getAPIKey();
	private _controls: Controls;
	private _toConnect = {
		"namespace": "connect",
		"method": "connect",
		"arguments": ["gmusic"]
	};
	public ws;

	constructor() {
		this.ws = new WebSocket(socketPath);
		this.openConnection();
		this._controls = new Controls();
		this._controls.showVisible();
	}

	public openConnection() {
		if (this._apiKey !== "notSet") {
			this._toConnect.arguments.push(this._apiKey);
		}

		console.info('opening connection...');
		this.ws.on('open', () => {
			console.log('connection: ' + JSON.stringify(this._toConnect));
			this.ws.send(JSON.stringify(this._toConnect));
			this.listener();
		});
	}

	public listener() {
		console.log('I am listening...');
		this.ws.on('message', (response) => {
			let res = JSON.parse(response);
			
			if (res.payload == 'CODE_REQUIRED') {
				console.log('grab that code!')
				this.grabAccessCode();
			}
			if (res.channel === 'connect' && res.payload !== 'CODE_REQUIRED') {
				updateAPIKey(res.payload);
			}

			if (res.channel === 'track') {
				this._controls.updateTrackInfo(res.payload);
			}
		})
	}

	public grabAccessCode() {
		const opts = {
			"ignoreFocusOut": true,
			"prompt": "A UI will popup in GPMDP containing a 4 digit code. Please copy the code and paste it above.",
			"value": "Type/Paste 4 digit code here."
		};
		window.showInputBox(opts).then(result => {
			this._toConnect.arguments.push(result);
			this.ws.send(JSON.stringify(this._toConnect));
		});
	}

	public closeConneciton() {
		this.ws.on('close', () => {
			console.log('connection terminated...');
		})
	}
}
