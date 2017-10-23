import { message } from './message';


export class Volume {
	private _msg: message;
	
	constructor() {
		this._msg = {
			namespace: 'volume',
			method: null
		};
	}
	
	public getVolume() {
		this._msg.method = 'getVolume';
		this._msg.requestID = 1;
		return JSON.stringify(this._msg);
	}
	
	public increaseVolume() {
		this._msg.method = 'increaseVolume';
		return JSON.stringify(this._msg);
	}
	
	public decreaseVolume() {
		this._msg.method = 'decreaseVolume';
		return JSON.stringify(this._msg);
	}
	
	public setVolume(vol: number) {
		this._msg.method = 'setVolume';
		this._msg.arguments = [vol];
		return JSON.stringify(this._msg);
	}
}