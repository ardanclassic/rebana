

export const toggleShow = (id, show) => async (dispatch) => {
    if (show) {
        dispatch({ type: 'MENU_SHOW', value: true, menuID: id });
    } else {
        dispatch({ type: 'MENU_SHOW', value: false, menuID: id });
    }
}

export const toggleAllow = (id, allow) => async (dispatch) => {
    if (allow) {
        dispatch({ type: 'MENU_ALLOW', value: true, menuID: id });
    } else {
        dispatch({ type: 'MENU_ALLOW', value: false, menuID: id });
    }
}