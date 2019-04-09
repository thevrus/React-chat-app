import React, { Component } from 'react';

export default class NewRoomForm extends Component {
	state = {
		roomName: ''
	};

	handleChange = event => {
		this.setState({
			roomName: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.createRoom(this.state.roomName);
		this.setState({
			roomName: ''
		});
	};

	render() {
		return (
			<div className="new-room-form">
				<form onClick={this.handleSubmit}>
					<input
						value={this.state.roomName}
						onChange={this.handleChange}
						type="text"
						placeholder="New room"
						required
					/>
					<button id="create-room-btn" type="submit" />
				</form>
			</div>
		);
	}
}
