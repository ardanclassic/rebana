export const getParent = (array, id, parentId = null) => {
  for (const entry of array) {
    if (entry.id === id) {
      return parentId;
    }
    let deeperParentId;
    if (entry.childs && (deeperParentId = getParent(entry.childs, id, entry.id))) {
      return deeperParentId;
    }
  }
  return null;
}

export const getArrayByID = (array, id) => {
  let res;
  const findNode = (array, id) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        res = array[i];
        break;
      }
      if (array[i].childs) {
        findNode(array[i].childs, id);
      }
    }
  }
  findNode(array, id)
  return res;
}


export const updateMenu = (allMenu, name, type, value) => {
	const updatedMenus = [...allMenu]
  updatedMenus.forEach(function iter(a) {
    if ([name].includes(a.id)) {
      a[type] = value;
    }
    Array.isArray(a.childs) && a.childs.forEach(iter);
  });
	return updatedMenus;
}