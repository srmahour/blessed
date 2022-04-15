

export const ATag = ({t,tag,color,size,isDelete,index,onDelete} : {t(ts  : string) : string,tag : string, color : string, size? : string, isDelete? :  boolean, index? : number , onDelete?(index : number) : void}) => {
    if (isDelete)
        return(
            <span className={'tags has-addons'}>
                <span className={`tag ${color} `}>
                    {t !== undefined &&
                    typeof t === 'function' &&
                        t(tag)}
                    {t === undefined && tag}
                </span>
                <a className={'tag is-delete'}
                    onClick={() => {
                        onDelete(index);
                    }}
                />
            </span>
        )
    else
        return(
            <span className={`tag ${color} ${size}`}>
                {t !== undefined &&
                    typeof t === 'function' && t(tag)}
                {t === undefined && tag}
            </span>
        )
};

export const AGrpTag = ({t,leftTag,tag,color} : {t(ts  : string),leftTag : string, tag : string, color? : string}) => {

    return(
        <div className={'field is-grouped'}>
            <div className={'control'}>
                <div className={`tags has-addons`}>
                    <span className={'tag is-dark'}>
                         {t !== undefined &&
                         typeof t === 'function' && t(leftTag)}
                        {t === undefined && leftTag}
                    </span>
                    <span className={`tag ${color ? color : ''}`}>
                         {t !== undefined &&
                         typeof t === 'function' && t(tag)}
                        {t === undefined && tag}
                    </span>
                </div>
            </div>
        </div>
    )
}