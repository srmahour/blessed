// @ts-nocheck
import {useFetch} from "react-async";
import { getIFrameByPlatform } from "./AInterviewCarouselView";
import {APagination} from "../APagination";
import moment from "moment";
import {AGrpTag} from "../elements/ATag";
import Link from 'next/link';





export const AInterviewView = ({t,page,limit,onClickPage,isMobile,isTablet}  : {t(ts:string) : string,page : number , limit : number,onClickPage(page: number) : void,isMobile? : boolean, isTablet? : boolean}) => {

    let url = '/interviews?';

    if (limit)
        url += `limit=${limit}&`;
    if (page)
        url += `page=${page}&`;



    const {data,error} = useFetch(`${process.env.NEXT_PUBLIC_BFS_API}${url}`,{
        headers: {accept:'application/json',

        }
    });

    if (error){
        return error.message;
    }



    if (data){
        return(
            <section
            className={isMobile ? '' : isTablet ? '' : 'interviews-container'}
            style={{
                display: isMobile ? '' : isTablet ? '' : '',

            }}
            >
                { //@ts-ignore
                    data.docs.map((d : object,i : number) => {
                        let sty = {};
                        let w,h,mh;

                        if (isMobile){
                            h = 300;
                            w = '100%';
                        }else if (isTablet){
                            w = '100%';
                            h = 460;
                            sty = {


                            };
                        }else{
                            sty = {
                                flexGrow:0,
                                flexShrink:0,
                                margin:'5px',
                                maxHeight:'377.5px'
                            };

                            w = process.browser && window.devicePixelRatio >= 2 ? 560 : 560;
                            h = 300;
                        }

                        return(
                            <div

                                style={sty}
                                key={i}>
                                     <span style={{width: isMobile ? '100%' : isTablet ? '100%' : '560px',display:'block'}}>
                                        <strong>
                                         <p style={{overflowWrap:"break-word"}}
                                        >
                                             <AGrpTag  leftTag={'Date'}  tag={moment(d.date).format("MMM Do YYYY")} color={'is-primary'}/>
                                        &nbsp;
                                             <Link passHref
                                              href={{
                                                  pathname:'/interview/[id]',
                                                  query:{
                                                      id:d._id
                                                  }
                                              }}
                                             >
                                             <a>
                                                {d.title.length <= 68 &&
                                                d.title}
                                                 {d.title.length >= 69 &&
                                                 d.title.substr(0,60)  + ' ...'
                                                 }
                                             </a>
                                             </Link>

                                         </p>
                                            </strong>
                                    </span>
                                {getIFrameByPlatform( //@ts-ignore
                                    d.type,d.url,w,h)}


                            </div>
                        )
                    })
                }
                <br/>
                <APagination t={t} page={ //@ts-ignore
                    data.page} total={ data.totalPages}
                             hasPrevious={ //@ts-ignore
                                 data.hasPrevPage}
                             hasNext={ //@ts-ignore
                                 data.hasNextPage}
                             onClickPage={(p) => {
                                 onClickPage(p);
                             }}/>
            </section>
        )
    }

    return <p>loading</p>
}