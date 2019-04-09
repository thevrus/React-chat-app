import React, { Component } from 'react';

export default class SendMessage extends Component {
	state = {
		message: ''
	};

	handleChange = event => {
		this.setState({
			message: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.sendMessage(this.state.message);
		this.setState({
			message: ''
		});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="send-message-form">
				<input
					disabled={this.props.disabled}
					onChange={this.handleChange}
					value={this.state.message}
					type="text"
					placeholder="Type your message and press Enter"
				/>
			</form>
		);
	}
}
