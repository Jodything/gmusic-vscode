import { commands, Disposable } from 'vscode';
import { Command } from './command';

export function createCommands(): { dispose: () => void } {
	var com = new Command();

	const playPause = commands.registerCommand('gmusic.playPause', com.playPause);
	const nextTrack = commands.registerCommand('gmusic.nextTrack', com.nextTrack);
	const prevTrack = commands.registerCommand('gmusic.prevTrack', com.prevTrack);
	const incVol = commands.registerCommand('gmusic.increaseVolume', com.increaseVolume);
	const decVol = commands.registerCommand('gmusic.decreaseVolume', com.decreaseVolume);
	
	return Disposable.from(playPause, nextTrack, prevTrack, incVol, decVol);
}