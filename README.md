# VSCode Google Music Extension

This is a companion extension for [Google Play Music Desktop Player](https://www.googleplaymusicdesktopplayer.com/). It provides integration for the Mac desktop client.

## How it works

The Google Play Music Desktop app provides an interface for external applications to interact with it. This interface is provided through a locally hosted Web Socket. This extension works by connecting to that websocket.

## Features

* Shows the currently playing artist, song, and album in the status bar of vscode.
* StatusBar commands, including: 
	* play/pause
	* next track
	* prev track
	* volume up
	* volume down