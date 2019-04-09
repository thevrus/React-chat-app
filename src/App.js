import React, { Component } from 'react';
import MessageList from './components/message-list';
import RoomList from './components/room-list';
import SendMessage from './components/send-message';
import NewRoomForm from './components/new-room-form';

import Chatkit from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from './config';
import './style.css';

export default class extends Component {
	state = {
		messages: [],
		joinableRooms: [],
		joinedRooms: [],
		roomId: undefined
	};

	componentDidMount() {
		const chatManager = new Chatkit.ChatManager({
			instanceLocator,
			userId: 'VRUS',
			tokenProvider: new Chatkit.TokenProvider({
				url: tokenUrl
			})
		});

		chatManager.connect().then(currentUser => {
			this.currentUser = currentUser;
			this.getRooms();
		});
	}

	getRooms() {
		this.currentUser
			.getJoinableRooms()
			.then(joinableRooms => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms
				});
			})
			.catch(err => console.log('error on joinableRooms: ', err));
	}

	createRoom = roomName => {
		this.currentUser
			.createRoom({
				name: roomName
			})
			.then(room => {
				this.subscribeToRoom(room.id);
			});
	};

	subscribeToRoom = room => {
		this.setState({
			messages: []
		});

		this.currentUser
			.subscribeToRoom({
				roomId: room,
				hooks: {
					onMessage: message => {
						this.setState({
							messages: [...this.state.messages, message]
						});
					}
				}
			})
			.then(room => {
				this.setState({
					roomId: room.id
				});

				this.getRooms();
			})
			.catch(error => {
				console.log('Error with connection ‼️ ', error);
			});
	};

	sendMessage = text => {
		this.currentUser.sendMessage({
			text,
			roomId: this.state.roomId
		});
	};

	render() {
		return (
			<div className="app">
				<RoomList
					roomId={this.state.roomId}
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, this.state.joinedRooms]}
				/>
				<MessageList
					roomId={this.state.roomId}
					messages={this.state.messages}
				/>
				<SendMessage
					disabled={!this.state.roomId}
					sendMessage={this.sendMessage}
				/>
				<NewRoomForm createRoom={this.createRoom} />
			</div>
		);
	}
}
