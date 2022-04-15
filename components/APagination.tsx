import {ADesktopOnly} from "./AHiders";


export const APagination = ({t,page,total,hasPrevious,hasNext,onClickPage} : {t(ts:string) : string,page : number, total : number,hasPrevious : boolean , hasNext : boolean,onClickPage(page : number) : void}) => {
    let pages = [];
    for (let i = 1 ; i <= total; i++){
        pages.push(i);
    }

    let bAlotPages = false;
    let first = null;
    let last = null;
    if (pages.length > 10){

        bAlotPages = true;
        first = pages[0];
        last = pages[pages.length -1];

        pages = [];
        let curPage = page === 1 ? first + 1 : page - 1 !== 1 ? page - 1 : page;
        for (let i = page === 1 ? first + 1 : page - 1 !== 1 ? page - 1 : page; i <= curPage + 4; i++){
            pages.push(i);
        }

    }


    return(
        <nav className={'pagination is-centered'} role={'navigation'}>
            <a onClick={() => {
                onClickPage(page - 1);
            }}   // @ts-ignore
                className={`pagination-previous`}   style={!hasPrevious ? {} : {backgroundColor:'#add2ed'}} disabled={!hasPrevious}>{t('common:prev')}</a>
            <a onClick={() => {
                onClickPage(page + 1);
            }}   // @ts-ignore
                className={'pagination-next'}   style={!hasNext ? {} : {backgroundColor:'#add2ed'}} disabled={!hasNext}>{t('common:next')}</a>
            <ADesktopOnly>
                <ul className={'pagination-list'}>
                    {bAlotPages && <li>
                        <a    style={page === 1 ? {} : {backgroundColor:'#add2ed'}}
                              onClick={() => onClickPage(first)}
                              className={`pagination-link  ${page === first ? 'is-current' : ''}`}>{first}</a>
                    </li>}
                    {
                        bAlotPages && <li><span className="pagination-ellipsis">&hellip;</span></li>
                    }
                    {

                        pages.map((p : number,i) =>{
                            return(
                                <li key={i}>
                                    <a
                                        style={page === p ? {} : {backgroundColor:'#add2ed'}}
                                        onClick={() => onClickPage(p)}
                                        className={`pagination-link ${page === p ? 'is-current' : ''}`}
                                    >{p}</a>
                                </li>
                            )
                        })
                    }
                    {bAlotPages && <li><span className="pagination-ellipsis">&hellip;</span></li>}
                    {bAlotPages && <li>
                        <a   style={page === last ? {} : {backgroundColor:'#add2ed'}}
                             onClick={() => onClickPage(last)}
                             className={`pagination-link  ${page === last ? 'is-current' : ''}`}>{last}</a>
                    </li>}
                </ul>
            </ADesktopOnly>

        </nav>
    )
}