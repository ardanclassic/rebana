import { FileData } from 'assets/data'
// import { updateMenu } from 'utils/helper';

const initialState = {
	allMenu: FileData,
}

const reducer = (state = initialState, action) => {
	let updatedMenu = [];
	switch (action.type) {
		case 'MENU_SHOW':
			updatedMenu = updateMenu(state.allMenu, action.menuID, "isShowed", !action.value);
			return {
				...state,
				allMenu: updatedMenu,
			}
		case 'MENU_ALLOW':
			updatedMenu = updateMenu(state.allMenu, action.menuID, "isAllowed", !action.value);
			return {
				...state,
				allMenu: updatedMenu,
			}
		default:
			return state;
	}
}

const updateMenu = (allMenu, name, type, value) => {
	const updatedMenus = [...allMenu]
  updatedMenus.forEach(function iter(a) {
    if ([name].includes(a.id)) {
      a[type] = value;
    }
    Array.isArray(a.childs) && a.childs.forEach(iter);
  });
	return updatedMenus;
}

export default reducer;