import React from 'react'

import onlineIcon from '../../icons/onlineIcon.png'

import './TextContainer.css'

const TextContainer = ({ users, room }) => (
	<div className="textContainer">
		{users ? (
			<div>
				<h2>People active in {room} Room:&nbsp;</h2>
				<h2>{users.room}</h2>
				<div className="activeContainer">
					<h2>
						{users.map(({ name }) => (
							<div key={name} className="activeItem">
								{name}
								<img alt="Online Icon" src={onlineIcon} />
							</div>
						))}
					</h2>
				</div>
			</div>
		) : null}
	</div>
)

export default TextContainer
