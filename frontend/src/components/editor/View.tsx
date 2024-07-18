import { useState, useReducer,useEffect } from "react"
import {Row, Col} from "antd"
import { useEditor } from "@/Contexts/EditorContext";

import Components from "@/components/mailComponents"

const View = () => {

    const {state, dispatch, handlePosition} = useEditor()

    const generateGrid = (param :any) => {
        return (
            <div className=" w-full min-h-[60vh] max-h-[80vh]">
                {state?.map((row : any[], rowIndex : number) => 
                    (<Row key={rowIndex}>{row?.map((col :any, colIndex: number) => 
                        (<Col span={col?.containerWidth } 
                            key={colIndex} 
                            className={`${col.isEdited ? "border border-red-500 border-solid" : ""}`} 
                            onClick={() => {
                                dispatch({type : "edit", data :{rowIndex,colIndex}})
                                handlePosition(rowIndex,colIndex)
                            }}>
                                {col.name ? (<Components name={col.name} keys={col.keys} />) :
                                `Col ${rowIndex}-${colIndex}`}
                            </Col>))}
                    </Row>))
                }
            </div>
        )
    }

    return (
        <>
            {generateGrid(state)}
        </>
    )
}

export default View  