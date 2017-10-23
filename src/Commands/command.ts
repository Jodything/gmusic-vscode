import { Connect } from '../GoogleMusic/connect';
import { Playback } from './playback';
import { Volume } from './volume';

export class Command extends Connect {
	// private _pb = new Playback();
	// private _vol = new Volume();

	// constructor() {
	// 	super();
	// 	this._pb = new Playback();
	// }

	//Playback methods
	// public getCurrentTrack() {
	// 	this.ws.send(this._pb.getCurrentTrack());
	// }

	public playPause = () => {
		// return this.ws.send(this._pb.playPause());
		this.ws.send(JSON.stringify({
			namespace: "playback",
			method: "playPause",
			requestID: 1
		}));
	}

	public nextTrack = () => {
		// this.ws.send(this._pb.nextTrack());
		this.ws.send(JSON.stringify({
			namespace: "playback",
			method: "forward"
		}));
	}

	public prevTrack = () => {
		// this.ws.send(this._pb.prevTrack());
		this.ws.send(JSON.stringify({
			namespace: "playback",
			method: "rewind"
		}));
	}

	// Volume methods
	// public getVolume() {
	// 	this.ws.send(this._vol.getVolume());
	// }

	public increaseVolume = () => {
		// this.ws.send(this._vol.increaseVolume());
		this.ws.send(JSON.stringify({
			namespace: "volume",
			method: "increaseVolume"
		}));
	}

	public decreaseVolume = () => {
		// this.ws.send(this._vol.decreaseVolume());
		this.ws.send(JSON.stringify({
			namespace: "volume",
			method: "decreaseVolume"
		}));
	}

	// public setVolume(volume: number) {
	// 	this.ws.send(this._vol.setVolume(volume));
	// }
}