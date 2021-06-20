import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Submenu = ({ data }) => {
	const location = useLocation().pathname.substr(1);
	
	const activeLink = (path) => location === path ? 'active' : '';
	const checkShowed = (showed) => showed ? 'showed' : 'hidden';
	const checkAllowed = (allowed) => allowed ? 'allowed' : 'disabled';

	const [subnav, setSubnav] = useState(false);
	const showSubnav = (allowed) => { if (allowed) setSubnav(!subnav); }

	const setSubMenu = () => {
		if (subnav) {
			return (
				<ul className={`sub-menu ${checkShowed(data.isShowed)} ${checkAllowed(data.isAllowed)}`}>
					{ data.childs.map(dt => {
							if (dt.childs) {
								return <Submenu key={dt.id} data={dt} />
							} else {
								return (
									<li key={dt.id}>
										<Link className={ `${checkShowed(dt.isShowed)} ${checkAllowed(dt.isAllowed)} ${activeLink(dt.id)}` } 
											to={{ pathname: `${dt.id}`, state: dt }}>
											{ (dt.id).replace(/-|_/g, ' ') }
										</Link>
									</li>
								)
							}
						})
					}
				</ul>
			)
		}
	}

	return (
		<React.Fragment>
			<li onClick={() => showSubnav(data.isAllowed)}>
				<Link className={ `${checkShowed(data.isShowed)} ${checkAllowed(data.isAllowed)}` } 
					to={{ pathname: data.id, state: data }} >
					{ (data.id).replace(/-/g, ' ') }
					{ subnav ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }
				</Link>
			</li>
			{ setSubMenu() }
		</React.Fragment>
	)
}

const reduxState = (state) => ({
	allMenu: state.allMenu
})

export default connect(reduxState)(Submenu)