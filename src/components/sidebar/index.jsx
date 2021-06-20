import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Submenu from './submenu';
import EditProfile from 'components/modal';
import Rebana from 'assets/rebana.png'
import './style.scss'

function Sidebar(props) {
	const location = useLocation().pathname.substr(1);
	const { allMenu } = props;

	const [avatar, setAvatar] = useState("New User")
	const [gender, setGender] = useState("male")
	const [modal, setModal] = useState(false)

	const activeLink = (path) => location === path ? 'active' : '';
	const checkShowed = (showed) => showed ? 'showed' : 'hidden';
	const checkAllowed = (showed) => showed ? 'allowed' : 'disabled';

	const showModal = () => { setModal(!modal) }

	const getValue = (value) => {
		if (value.username && value.usergender) {
			setAvatar(value.username)
			setGender(value.usergender)
		}
	} 

	return (
		<aside className="sidebar menu">
			<div className="description-area">
				<div className="logo-title"><img src={Rebana} alt="logo" /> Rebana</div>
				<div className="avatar-image">
					<i class="far fa-edit" onClick={showModal}></i>
					<img src={`https://avatars.dicebear.com/api/${gender}/${avatar}.svg`} alt="avatar"/>
					<div className="username">{avatar}</div>
          
          <EditProfile closeModal={showModal} modalState={modal} value={getValue} />
				</div>
			</div>
			<ul className="menu-list">
				{ allMenu.map(data => {
					if (data.childs) {
						return <Submenu key={data.id} data={data} />
					} else {
						return (
							<li key={data.id}>
								<Link className={`${checkShowed(data.isShowed)} ${checkAllowed(data.isAllowed)} ${activeLink(data.id)}`}
									to={{ pathname: data.id, state: data }}>{(data.id).replace(/-|_/g, ' ')}</Link>
							</li>
						)
					}
				}) }
			</ul>
		</aside>
	)
}


const reduxState = (state) => ({
	allMenu: state.allMenu
})

export default connect(reduxState)(Sidebar)