import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from '@/app/(routes)/dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
function Canvas({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {
const [whiteboardData,saveWhiteBoardData]=useState<any>();

const updateWhiteboard=useMutation(api.files.updateWhiteboard)
useEffect(()=>{
onSaveTrigger&&saveWhiteBoard();

},[onSaveTrigger])
const saveWhiteBoard=()=>{
        updateWhiteboard({
            _id:fileId,
            whiteboard:JSON.stringify(whiteboardData)
        }).then(resp=>console.log(resp))
}

  return (
    <div style={{ height: "670px" }}>
   
    <Excalidraw   initialData={{
        elements:fileData&&JSON.parse(fileData.whiteboard)
    }}  onChange={(excalidrawElements, appState, files)=>
    saveWhiteBoardData(excalidrawElements)}    
    >
        <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas/>
            <MainMenu.DefaultItems.Export/>
            <MainMenu.DefaultItems.SaveAsImage/>
            <MainMenu.DefaultItems.LoadScene/>
            <MainMenu.DefaultItems.SaveToActiveFile/>
            <MainMenu.DefaultItems.ToggleTheme/>
            <MainMenu.DefaultItems.ChangeCanvasBackground/> 
            <MainMenu.ItemCustom.name/>
                <MainMenu.DefaultItems.Help/>
        </MainMenu>

        <WelcomeScreen.Hints.MenuHint/>
        <WelcomeScreen.Hints.MenuHint/>
        <WelcomeScreen.Hints.ToolbarHint/>
    </Excalidraw>
  </div>
  )
}

export default Canvas