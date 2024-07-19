import { createContext, useReducer, useContext, FC, ReactNode, useState,useEffect} from "react";

import reducer from "@/utils/EditorReducer";
import {EditedPositionType, EditorContextType} from "@/Contexts/types"

const defaultContext = {
    state : [
			[{isEdited : true, containerWidth:24, style: {height : "100%"}}],
			[{containerWidth:8 ,style: {height : "100%"}},{containerWidth:8,style: {height : "100%"}},{containerWidth:8,style: {height : "100%"}}],
			[{containerWidth:12,style: {height : "100%"}},{containerWidth:12,style: {height : "100%"}}]
		],
		dispatch : () => {},
		editedPostion : {colId : 0, rowId : 0},
		handlePosition : () => {},
		currentEdited: {isEdited : true}
}

const EditorContext = createContext<EditorContextType>(defaultContext);

export const EditorProvider: FC<{ children: ReactNode }> = ({ children }) => {

const [state, dispatch] = useReducer(reducer,  defaultContext.state);

const [editedPostion, setEditedPosition] = useState<EditedPositionType>(defaultContext.editedPostion)

const handlePosition = (rowId: number ,  colId : number) => {
	console.log(rowId, colId)
	setEditedPosition({ colId, rowId})
}

  return (
		<EditorContext.Provider value={{ state, dispatch, editedPostion, handlePosition }}>
			{children}
		</EditorContext.Provider>
	);
}

export const useEditor = () => useContext(EditorContext);