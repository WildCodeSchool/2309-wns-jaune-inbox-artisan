function reducer(state: any, action: any) {
	if (action.type === 'edit') {
		const { rowIndex, colIndex } = action.data;
		const newLayout = [...state];
		return newLayout.map((row: any[], rowId: number) =>
			row.map((col: any, colId: number) => {
				return { ...col, isEdited: colIndex === colId && rowIndex === rowId };
			})
		);
	}

	if (action.type === 'setup') {
		return action.data;
	}

	if (action.type === 'load') {
		console.log(action.data);
		if (action.data) return JSON.parse(action.data);
	}

	if (action.type === 'addComponent') {
		const { name, keys, position } = action.data;
		const newLayout = [...state];
		newLayout[position.rowId][position.colId] = {
			...newLayout[position.rowId][position.colId],
			name,
			keys,
			// style
		};
		return newLayout;
	}

	if (action.type === 'handleKeys') {
		const { position, data } = action;
		console.log(position, data);
		const newLayout = [...state];
		const edited = newLayout[position.rowId][position.colId].keys;
		newLayout[position.rowId][position.colId].keys = { ...edited, ...data };
		return newLayout;
	}

	if (action.type === 'handleContainerProperty') {
		const { position, data } = action;
		console.log(position, data);
		const newLayout = [...state];
		const edited = newLayout[position.rowId][position.colId];
		console.log(edited);
		if (data.containerWidth) {
			const row = newLayout[position.rowId];
			row[position.colId] = { ...edited, ...data };
			const colAmount = row.length; // longueur
			const totalWidth = row.reduce(
				(acc: number, cur: { containerWidth: number }) =>
					acc + cur.containerWidth,
				0
			);
			// si postion actuel (ColId) != 0 on modifie index(0) avec l'opposer sinon on modifie index(0)
			const colToEdit = () => {
				if (colAmount === 3) {
					const comparisons = [
						[1, 2],
						[0, 2],
						[0, 1],
					];
					const [a, b] = comparisons[position.colId];
					const preferredIndex =
						row[a].containerWidth > row[b].containerWidth ? a : b;
					return totalWidth > 24
						? preferredIndex
						: preferredIndex === a
						? b
						: a;
				} else {
					return position.colId === 0 ? 1 : 0;
				}
			};
			row[colToEdit()].containerWidth += 24 - totalWidth;
			// largeur max 24
		}
		if (data.color) {
			edited.style.color = data.color;
		}
		if (data.backgroundColor) {
			edited.style.backgroundColor = data.backgroundColor;
		}
		if (data.height) {
			console.log(data.height);
			edited.style.height = data?.height + '%';
		}
		if (data.borderRadius) {
			edited.style.borderRadius = `${data.borderRadius}%`;
		}

		if (data.typoStyle === 'italic') {
			if (edited.style.fontStyle) delete edited.style.fontStyle;
			else edited.style.fontStyle = data.typoStyle;
		}
		if (data.typoStyle === 'bold') {
			if (edited.style.fontWeight) delete edited.style.fontWeight;
			else edited.style.fontWeight = '900';
		}
		if (data.typoStyle === 'underline') {
			if (edited.style.textDecoration) delete edited.style.textDecoration;
			else edited.style.textDecoration = data.typoStyle;
		}
		if (data.textAlign) {
			edited.style.textAlign = data.textAlign;
		}
		if (data.fontSize) {
			edited.style.fontSize = data.fontSize;
		}
		// console.log(edited)
		return newLayout;
	} else return state;
}

export default reducer;
