

function reducer(state: any, action: any) {
  if (action.type === "edit") {
    const { rowIndex, colIndex } = action.data
    const newLayout = [...state]
    return newLayout.map(((row: any[], rowId: number) =>
      row.map((col: any, colId: number) => {
        return { ...col, isEdited: colIndex === colId && rowIndex === rowId }
      })
    ))
  }

  if (action.type === "setup") {
    return action.data
  }

  if (action.type === "addComponent") {
    console.log(action.data)
    const { name, keys, position } = action.data
    const newLayout = [...state]
    newLayout[position.rowId][position.colId] =
    {
      ...newLayout[position.rowId][position.colId],         
      name,
      keys,
    }
    return newLayout
  }


  if (action.type === "handleKeys") {
    const { position, data } = action
    console.log(position, data)
    const newLayout = [...state]
    const edited = newLayout[position.rowId][position.colId].keys
    newLayout[position.rowId][position.colId].keys = { ...edited, ...data }
    return newLayout
  }

  if (action.type === "handleContainerProperty") {
    const { position, data } = action
    console.log(position, data)
    const newLayout = [...state]
    const edited = newLayout[position.rowId][position.colId]
    console.log(edited)
    if (data.containerWidth) {
      const rowAmount = newLayout[position.rowId].length

    }
    newLayout[position.rowId][position.colId] = { ...edited, ...data }
    console.log(edited)
    return newLayout
  }

  else return state
}

export default reducer