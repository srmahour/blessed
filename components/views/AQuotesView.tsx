
//@ts-nocheck
import {useFetch} from "react-async";
import React, {useEffect} from "react";
import {APagination} from "../APagination";
import xss from "xss";
import {AFloatRight} from "../AFloat";
import moment from "moment";


export function AQuotesView({t,page,limit,onPage} : {t(ts : string) : string, page : number, limit : number,onPage(page : number) : number}){

    useEffect(() =>{

    },[page]);



    if (page){
        return GetQuotes(t,page,limit,onPage);
    }
    else
        return <div>Error</div>;
}


const GetQuotes = ( t, page : number , limit : number,onPage) => {
    const {data ,error} = useFetch(`${process.env.NEXT_PUBLIC_BFS_API}/quotes?page=${page}&limit=${limit}`,{
        headers: { accept: "application/json" },
    });

    if (error){
        return error.message;
    }

    if (data){
        return(
            <section>
                {//@ts-ignore
                    Array.isArray(data.docs) &&
                    //@ts-ignore
                    data.docs.map((q,i) => {
                        return(
                            <blockquote key={`q-${i}`}>
                                <AFloatRight>
                                    <strong>
                                        {moment(q.date).format("MMMM DD HH:mm A")}
                                    </strong>
                                </AFloatRight>

                                <p style={{paddingTop:'35px'}}
                                    dangerouslySetInnerHTML={{__html:xss(q.quote)}}/>
                            </blockquote>
                        )
                    })
                }

                <APagination t={t} page={page} total={data.totalPages} hasPrevious={data.hasPrevPage}
                             hasNext={data.hasNextPage} onClickPage={(p) => onPage(p)}/>
            </section>
        )
    }

    return <div>Loading...</div>;
}