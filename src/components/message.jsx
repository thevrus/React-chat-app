import React from 'react';

export default function Message(props) {
	return (
		<div className="message">
			<div className="message-username">{props.user}</div>
			<div className="message-text">{props.message}</div>
		</div>
	);
}
