import { message } from './message';

export class Playback {
	private _msg: message;
	
	contructor() {
		this._msg = {
			namespace: 'playback',
			method: null
		};
		console.log('msg: ' + this._msg);
	}
	
	public getCurrentTrack() {
		this._msg.method = 'getCurrentTime';
		this._msg.requestID = 1;
		return JSON.stringify(this._msg);
	}
	
	public playPausez() {
		console.log('two ' + JSON.stringify(this));
		this._msg.method = 'playPause';
		this._msg.requestID = 1;
		return JSON.stringify(this._msg);
	}
	
	public nextTrack() {
		this._msg.method = 'forward';
		return JSON.stringify(this._msg);
	}
	
	public prevTrack() {
		this._msg.method = 'rewind';
		return JSON.stringify(this._msg);
	}
}