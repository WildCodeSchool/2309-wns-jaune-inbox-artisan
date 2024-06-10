import Library from "@/components/editor/Library";
import { NextPageWithLayout } from "../_app";
import ToolBar from "@/components/editor/ToolBar";
import View from "@/components/editor/View";
import Properties from "@/components/editor/Properties";
import { useState } from "react";

const Editor: NextPageWithLayout = () => {


    const [mail, setMail] = useState("");



    return (
        <div className="editor">
            <ToolBar></ToolBar>
            <button>add header</button>
            <div>
                <Library></Library>
                <View mail={mail}></View>
                <Properties></Properties>
                </div>
        </div>
        
    )
}

export default Editor;