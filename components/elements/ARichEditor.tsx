import {Button,Icon,Toolbar} from './ARichDeps';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import isHotkey from 'is-hotkey';
import escapeHtml from 'escape-html';
import {Editable, withReact, useSlate, Slate, useSelected, useFocused} from 'slate-react';
import { Editor, Transforms, createEditor, Node ,Text, Element as SlateElement , Range, Descendant} from 'slate';
import { withHistory } from 'slate-history';
import {jsx} from 'slate-hyperscript';
import {nanoid} from 'nanoid';
import {AIcon} from "./AIcon";
import AHeading from "../AHeading";


const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

const COLORS  = [
    '#008080', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8',
    '#f15f2b','#ee8283','#4ca6a6','#2c3e50','#ff0027','#400404','#22594a','#c93333','#60b059',
    '#f2d26e','#98c0df',
];

const LIST_TYPES = ['numbered-list', 'bulleted-list'];



const ELEMENT_TAGS = {
    A: el => ({ type: 'link', url: el.getAttribute('href') }),
    BLOCKQUOTE: () => ({ type: 'quote' }),
    H1: () => ({ type: 'heading-one' }),
    H2: () => ({ type: 'heading-two' }),
    H3: () => ({ type: 'heading-three' }),
    H4: () => ({ type: 'heading-four' }),
    H5: () => ({ type: 'heading-five' }),
    H6: () => ({ type: 'heading-six' }),
    IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
    LI: () => ({ type: 'list-item' }),
    OL: () => ({ type: 'numbered-list' }),
    P: () => ({ type: 'paragraph' }),
    PRE: () => ({ type: 'code' }),
    UL: () => ({ type: 'bulleted-list' }),
};

const TEXT_TAGS = {
    CODE: () => ({ code: true }),
    DEL: () => ({ strikethrough: true }),
    EM: () => ({ italic: true }),
    I: () => ({ italic: true }),
    S: () => ({ strikethrough: true }),
    STRONG: () => ({ bold: true }),
    U: () => ({ underline: true }),
};



const deserialize = el => {

    if(el === undefined || el === null){
        return;
    }

    if (el.nodeType === 3) {
        return el.textContent;
    }else if (el.nodeType !== 1){


    } else if (el.nodeName === 'BR') {
        return '\n';
    }



    const { nodeName } = el;
    let parent = el;

    if (
        nodeName === 'PRE' &&
        el.childNodes[0] &&
        el.childNodes[0].nodeName === 'CODE'
    ) {
        parent = el.childNodes[0]
    }

    let children = Array.from(parent.childNodes)
        .map(deserialize)
        .flat();

    if (children.length === 0) {
        children = [{ text: '' }];
    }

    if (el.nodeName === 'BODY') {
        return jsx('fragment', {}, children);
    }

    if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el)
        return jsx('element', attrs, children);
    }

    if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el)
        return children.map(child => jsx('text', attrs, child));
    }

    return children;
};

const serialize_node = node => {
    let t1,t2;
    t1 = '';
    t2 = '';
    
    if (node.bold) {
        t1 += `<strong>`;
        t2 = `</strong>${t2}`;
    }

    if (node.italic) {
        t1 += '<em>';
        t2 = `</em>${t2}`;
    }

    if (node.underline) {
        t1 += '<u>';
        t2 = `</u>${t2}`;
    }

    if(node.strikethrough){
        t1 += '<del>';
        t2 = `</del>${t2}`;
    }

    if(node.red){
        t1 += `<span style="color:red">`;
        t2 = `</span>${t2}`;
    }

    if(node.blue){
        t1 += `<span style="color:blue">`;
        t2 = `</span>${t2}`;
    }

    if(node.highlighter){
        t1 += `<span class="highlight-container"><span class="highlight">`;
        t2 = `</span></span>${t2}`;
    }

    if (node.type === 'link'){
        return `<a href="${node.url}" target="_blank" rel="noreferrer noopener" >${node.children[0].text}</a>`;
    }

    return `${t1}${node.text}${t2}`;
};

const serialize = node => {
    if(Text.isText(node)){
        return escapeHtml(node.text);
    }
    const children = node.children.map(n => serialize_node(n)).join('');


    switch (node.type) {
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'bold':
            return `<strong>${children}</strong>`;
        case 'underline':
            return `<u>${children}</u>`;
        case 'strikethrough':
            return `<del>${children}</del>`;
        case 'block-quote':
            return `<blockquote>${children}</blockquote>`;
        case 'heading-one':
            return `<h1 class="title is-1">${children}</h1>`;
        case 'heading-two':
            return `<h2 class="title is-2">${children}</h2>`;
        case 'heading-three':
            return `<h3 class="title is-3">${children}</h3>`;
        case 'heading-four':
            return `<h4 class="title is-4">${children}</h4>`;
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        case 'image':

            return `<img src="${escapeHtml(node.url)}" />`;
        default:
            return children;
    }
};

export const serializer = array => {
    let t = '';
    if( Array.isArray(array)){
        array.map((a) => {

            t += serialize(a)
        });
    }
    return t;
};




const LOAD_TEXT = (text) => {
    if(process.browser){
        const doc = new DOMParser().parseFromString(text,'text/html');
        return deserialize(doc);
    }
};

export function ARichEditor({content , index , onChanged , placeholder , height , width} :
                                {content? : string , index? : number , onChanged(payload : object) : void , placeholder? : string
                                    height? : number, width? : number
                                }){

    if (process.browser){
        const isHTML = /<.+?>/g;
        const [value, setValue] = useState(LOAD_TEXT(content !== undefined ? `${isHTML.test(content) ? content : `<p>${content}</p>`}` : '<p></p>' ));
        const renderElement = useCallback(props => <Element style={{ userSelect: "none" }} contentEditable={false} {...props} />, []);
        const renderLeaf = useCallback(props => <Leaf  style={{ userSelect: "none" }} contentEditable={false} {...props} />, []);
        //@ts-ignore
        const editor = useMemo(() => withHTML(withHistory(withReact(createEditor()))), []);

        let ID,_el;
        _el = {};
        if(process.browser){
            ID = nanoid();
        }

        useEffect(() => {
            if (process.browser){
                const textBox = document.getElementById(`${ID}`);

                if(textBox){
                    _el = {
                        width:textBox.offsetWidth,
                        height:textBox.offsetHeight,

                    }
                }

            }
        },[]);

        if(!process.browser)
            return(
                <span>
            Text Entry Will Load at Client
            </span>
            );
        else
            return (
                <span
                    style={{width:'inherit',backgroundColor:'#a4cdec'}}
                >
            <Slate editor={editor}
                   value={value}
                   onChange={(value) => {
                       setValue(value);
                       const payload = {
                           html:serializer(value),
                           node:value,
                           index:index || null
                       };

                       payload.html = payload.html.replace( /<p>\s*<\/p>/gm,'');
                       onChanged(payload);
                   }}>
                <Toolbar
                    style={_el.width !== undefined ? {width:_el.width} : {color:'#a4cdec'}}
                >
                    <MarkButton format="bold" icon="bold" />
                    <MarkButton format="italic" icon="italic" />
                    <MarkButton format="underline" icon="underline" />
                    <MarkButton format={'strikethrough'} icon={'strikethrough'} />
                    <BlockButton format={'block-quote'} isHeading={false} icon={'quote-left'}/>
                    <BlockButton format="numbered-list" isHeading={false} icon="list-ol" />
                    <BlockButton format="list-item" isHeading={false} icon="list" />


                </Toolbar>
                <Editable
                    id={ID}
                    className={'slate-editor'}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder={placeholder}

                    style={{
                        height:height,
                        width:width !== undefined ? width : '',
                        overflowY: 'auto',
                        overflowX: 'auto',
                        backgroundColor:'#a4cdec'
                    }}
                    onKeyDown={(event) => {
                        for (const hotkey in HOTKEYS) {
                            // @ts-ignore
                            if (isHotkey(hotkey, event )) {
                                event.preventDefault();
                                const mark = HOTKEYS[hotkey];
                                toggleMark(editor, mark);
                            }
                        }
                    }}
                />
            </Slate>
            </span>
            );
    }else{
        return <span>Rich Text Editor</span>
    }


};


const withHTML = editor => {
    const { insertData, isInline, isVoid } = editor;

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element)
    };

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    };

    editor.insertData = data => {
        const html = data.getData('text/html');
        if (html) {
            const parsed = new DOMParser().parseFromString(html, 'text/html');
            const fragment = deserialize(parsed.body);
            Transforms.insertFragment(editor, fragment);
            return;
        }
        insertData(data);
    };

    return editor;
};



const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        //@ts-ignore
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    });

    Transforms.setNodes(editor, {
        //@ts-ignore
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {

        Editor.addMark(editor, format, true);
    }
};

const toggleColorMark = (editor,color) => {
    const isActive = isMarkActive(editor, 'color');
    if(isActive){
        Editor.removeMark(editor,'color');
    }else{

        Editor.addMark(editor,color,true);
    }
};

const isBlockActive = (editor, format) => {
    // @ts-ignore
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
        //@ts-ignore
        match: n => n.type === format,
    });

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {

    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
            return <AHeading size={'1'} {...attributes}>{children}</AHeading>;
        case 'heading-two':
            return <AHeading size={'2'} {...attributes}>{children}</AHeading>;
        case 'heading-three':
            return <AHeading size={'3'} {...attributes}>{children}</AHeading>;
        case 'heading-four':
            return <AHeading size={'4'} {...attributes}>{children}</AHeading>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
        case 'image':
            const p = {attributes,children,element};
            return <ImageElement {...p} />;
        case 'link':
            const l = {attributes,children,element};
            return <LinkElement {...l}/>
        default:
            return <p {...attributes}>{children}</p>;
    }
};



const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    if(leaf.strikethrough){
        children = <del>{children}</del>;
    }



    return <span {...attributes}>{children}</span>;
};


const insertImage = (editor , url) => {
    const text = {text:""};
    // @ts-ignore
    const image : ImageElement = {type : 'image', url , children: [text]};
    Transforms.insertNodes(editor, image);
}

const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            {children}
            <img
                src={element.url}
                style={{
                    display:'block',
                    maxWidth:'100%',
                    maxHeight:'20em',
                    boxShadow:`${selected && focused ? '0 0 0 2px blue;' : 'none'}`
                }}

            />
        </div>
    )
}



const BlockButton = ({ format, icon , isHeading }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                if (format === 'image'){
                    const url = window.prompt('Enter the URL of the image:');
                    insertImage(editor, url);
                }
                else
                    toggleBlock(editor, format)
            }}
        >
            {!isHeading &&

            <AIcon icon={icon}/>
            }

            {
                isHeading &&
                <span
                    style={{fontSize:'18'}}
                >
                        {icon}
                    </span>
            }

        </Button>
    );
};

const LinkButton = () => {
    const editor = useSlate();
    return (
        <Button
            active={isLinkActive(editor)}
            onMouseDown={event => {
                event.preventDefault();
                const url = window.prompt('Enter the URL of the link:');
                if (!url) return;
                insertLink(editor, url);
            }}
        >
            <AIcon icon={'link'}/>
        </Button>
    );
};

const UnLinkButton = () => {
    const editor = useSlate();
    return (
        <Button
            active={isLinkActive(editor)}
            onMouseDown={event => {
                if (isLinkActive(editor)) {
                    unwrapLink(editor);
                }

            }}
        >
            <AIcon icon={'unlink'}/>
        </Button>
    );
}

const insertLink = (editor , url) => {
    if (editor.selection){
        wrapLink(editor, url);
    }
}

const isLinkActive = editor => {
    // @ts-ignore
    const [link] = Editor.nodes(editor, {
        match: n =>
            // @ts-ignore
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}

const unwrapLink = editor => {

    Transforms.unwrapNodes(editor, {
        match: n =>
            // @ts-ignore
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor;
    // @ts-ignore
    const isCollapsed = selection && Range.isCollapsed(selection);
    // @ts-ignore
    const link: LinkElement = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    } else {
        Transforms.wrapNodes(editor, link, { split: true });
        Transforms.collapse(editor, { edge: 'end' });
    }
}

const LinkElement = ({ attributes, children, element }) => {

    return (<a {...attributes}
               href={element.url}
    >
        {children}
    </a>)
}

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();


    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleMark(editor, format)
            }}
        >
            <AIcon icon={icon}/>
        </Button>
    )

};



