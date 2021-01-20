import React from 'react'

import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'

import './Header.css'

const Header = ({ room }) => {
	return (
		<div className="header">
			<div className="leftInnerContainer">
				<img className="onlineIcon" src={onlineIcon} alt="online" />
				<h3>{room}</h3>
			</div>
			<div className="rightInnerContainer">
				<a href="/">
					<img src={closeIcon} alt="close" />
				</a>
			</div>
		</div>
	)
}

export default Header
