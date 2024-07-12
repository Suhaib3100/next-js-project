"use client";
import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Paragraph from '@editorjs/paragraph'; // Import Paragraph tool
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '@/app/(routes)/dashboard/_components/FileList';

const rawDocument={
    "time" : 1550476186479,
    "blocks" : [{
        data:{
            text:'Document Name',
            level:2
        },
        id:"123",
        type:'header'
    },
    {
        data:{
            text:'Powered By Suhaib King',
            level:2
        },
        id:"123",
        type:'paragraph'
    },
    {
        data:{
            level:4
        },
        id:"12345",
        type:'header'
    }],
    "version" : "2.8.1"
}
function Editor({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) {
    const ref=useRef<EditorJS>();
    const updateDocument=useMutation(api.files.updateDocument)
    const [document,setDocument]=useState(rawDocument);
    useEffect(() => {
        initEditor();
    }, [])

    useEffect(()=>{
            console.log("trigger value",onSaveTrigger);
            onSaveTrigger&&onSaveDocument();
    },[onSaveTrigger])

    const initEditor = () => {
        const editor = new EditorJS({
            tools: {
                header: Header,
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                embed: Embed,
                table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                        rows: 2,
                        cols: 3,
                    },
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
            },
            holder: 'editorjs',
            data:fileData?JSON.parse(fileData.document):rawDocument
        });
        ref.current=editor;
    };
        const onSaveDocument=()=>{
            if(ref.current){
                ref.current.save().then((outputData) => {
                    console.log('Article data: ', outputData);
                    updateDocument({
                        _id:fileId,
                        document:JSON.stringify(outputData)
                    }).then(resp=>{
                        if(resp){
                            toast('Document Updated')
                        }
                        
                    },(e)=>{
                        toast('Not Now I am being still developed!😉')
                    })
                  }).catch((error) => {
                    console.log('Saving failed: ', error)
                  });
                  
                  
            }
        }
    return (
        <div>
            <div id='editorjs' className='ml-20'></div>
        </div>
    );
}

export default Editor;
