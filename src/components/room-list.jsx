import React from 'react';

export default props => {
	const rooms = props.rooms[0].map(room => {
		const active = props.roomId === room.id ? 'active' : undefined;
		return (
			<li key={room.id} className={'room ' + active}>
				<a onClick={() => props.subscribeToRoom(room.id)} href="#!">
					{room.name}
				</a>
			</li>
		);
	});

	return (
		<div className="rooms-list">
			<h3>Your rooms: 🚀</h3>
			<ul>{rooms}</ul>
		</div>
	);
};
