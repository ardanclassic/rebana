import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Switch from 'components/switch';
import { toggleShow, toggleAllow } from 'redux/action';

function Dashboard(props) {
	const { toggleShow, toggleAllow, allMenu } = props;
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		let menus = allMenu.filter(el => el.id !== "dashboard");
		setMenu([...menus]);
	}, [])

	const setToggleValue = (e, item) => {
		const itemName = e.name.split("-")[0];
		const foundIndex = menu.findIndex(x => x.id === e.id);
		if (itemName === "isShowed") {
			menu[foundIndex] = { ...item, isShowed: !item.isShowed };
			toggleShow(item.id, item.isShowed)
		} else {
			menu[foundIndex] = { ...item, isAllowed: !item.isAllowed };
			toggleAllow(item.id, item.isAllowed)
		}
	}

	return (
		<>
			<h1 className="title is-1 has-text-white has-text-centered">{props.location.state.id}</h1>
			<table className="table is-fullwidth">
				<thead>
					<tr>
						<th>Main Menu</th>
						<th>Show / Hide</th>
						<th>Allow / Deny</th>
					</tr>
				</thead>
				<tbody>
						{
							menu.map(item => {
								return (
									<tr key={item.id}>
										<td>{item.id}</td>
										<td>
											<Switch isOn={item.isShowed} dataItem={{ type:"isShowed", id: `isShowed-${item.id}`, color: "green" }}
												handleToggle={(e) => setToggleValue(e.target, item)} />
										</td>
										<td>
											<Switch isOn={item.isAllowed} dataItem={{ type:"isAllowed", id: `isAllowed-${item.id}`, color: "orange" }}
												handleToggle={(e) => setToggleValue(e.target, item)} />
										</td>
									</tr>
								)
							})
						}
				</tbody>
			</table>
		</>
	)
}


const reduxState = (state) => ({
	allMenu: state.allMenu,
})

const reduxDispatch = dispatch => ({
	toggleShow: (id, showed) => dispatch(toggleShow(id, showed)),
	toggleAllow: (id, allowed) => dispatch(toggleAllow(id, allowed)),
})

export default connect(reduxState, reduxDispatch)(Dashboard)