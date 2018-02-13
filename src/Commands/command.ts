import { Connect } from '../GoogleMusic/connect';

export class Command extends Connect {
	public playPause = () => {
		this.ws.send(JSON.stringify({
			namespace: "playback",
			method: "playPause",
			requestID: 1
		}));
	}

	public nextTrack = () => {
		this.ws.send(JSON.stringify({
			namespace: "playback",
			method: "forward"
		}));
	}

	public prevTrack = () => {
		this.ws.send(JSON.stringify({
			namespace: "playback",
			method: "rewind"
		}));
	}

	public increaseVolume = () => {
		this.ws.send(JSON.stringify({
			namespace: "volume",
			method: "increaseVolume"
		}));
	}

	public decreaseVolume = () => {
		this.ws.send(JSON.stringify({
			namespace: "volume",
			method: "decreaseVolume"
		}));
	}
}