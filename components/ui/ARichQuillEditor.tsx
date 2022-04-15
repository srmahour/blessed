import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' },{header : '3'}, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],

        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],

        ['link', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
    'video',
]

export default ({content,onChanged,height,width} : {content ? : string,onChanged(payload : object),height? : string , width? : string}) => {

    const [value , setValue] = useState('');

    useEffect(() => {
        if (content){
            setValue(content);
        }
    },[]);

    const style = {};

    if (height){
        // @ts-ignore
        style.height = height;
    }
    if (width){
        // @ts-ignore
        style.width = width;
    }
    if (process.browser){
        //@ts-ignore
        return(//@ts-ignore
            <QuillNoSSRWrapper style={//@ts-ignore
                style} modules={modules} defaultValue={value} onChange={(value) => {
                const payload = {
                    html : value,
                    isEmpty:value.replace(/<(.|\n)*?>/g, '').trim().length === 0,
                }

                onChanged(payload);

            }} formats={formats} theme="snow" />
        )

    }else{
        return (<div>Loading</div>)
    }

}