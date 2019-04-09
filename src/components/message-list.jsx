import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';

export default class MessageList extends React.Component {
	componentWillUpdate() {
		const node = ReactDOM.findDOMNode(this);
		this.shouldScrollToBottom =
			node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
	}

	componentDidUpdate() {
		if (this.shouldScrollToBottom) {
			const node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight;
		}
	}

	render() {
		if (!this.props.roomId) {
			return (
				<div className="message-list">
					<div className="join-room">&larr; Join a room!</div>
				</div>
			);
		}
		const messageComponents = this.props.messages.map((message, id) => {
			return (
				<Message
					key={id}
					id={id}
					user={message.senderId}
					message={message.text}
				/>
			);
		});

		return <div className="message-list">{messageComponents}</div>;
	}
}
