// @ts-nocheck
import {useFetch} from "react-async";
import Cookies from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import xss from 'xss';
import moment from "moment";
import {APagination} from "../APagination";
import {AGrpTag, ATag} from "../elements/ATag";
import { GetDisplayContinent, GetDisplayCountry, GetDisplayState } from "../../utils/regions";
import React from "react";
import {ABR} from "../elements/ABR";
import {AMessage} from "../elements/AMessage";



export const AMyQuestionsView = ({t,limit,page,onClickPage} : {t(ts : string) : string,limit : number | string , page : number | string, onClickPage(page : number) : void}) => {
    let url = '/auth/questions?';

    if (limit)
        url += `limit=${limit}&`;
    if (page)
        url += `page=${page}&`;




    const {data,error} = useFetch(`${process.env.NEXT_PUBLIC_BFS_API}${url}`,{
        headers: {accept:'application/json',
            'authorization' : `${Cookies.get('token')}`
        }
    });



    if (error){
        setTimeout(() => {
            Router.push('/auth/login');
        },3000)
        return (<section>
            <AMessage t={t} opt={'is-danger'} msg={'warnings:auth-redirect'}/>

        </section>)
    }

    if (data){
        return(
            <section id={'My-Question-View'}>
                &nbsp; &nbsp;&nbsp; &nbsp;
                {   //@ts-ignore
                    data.totalDocs} {t('my-questions:total-questions')}

                { //@ts-ignore
                    data.docs.length === 0 &&
                    <section style={{textAlign:'center'}}>
                        {t('my-questions:no-questions')}
                    </section>
                }
                { //@ts-ignore
                    data.docs.map((d : object , i :number) => {
                        return(
                            <article
                                style={{minHeight:'220px'}}
                                className={'media box'}
                                key={i}
                            >
                                <figure className={'media-left'}>
                                    <span className={'image is-64x64'}>
                                        <img src={'/imgs/BFS_Logo_V2.png'}/>

                                    </span>
                                    { //@ts-ignore
                                        d.bIsAnon !== true &&  <p style={{textAlign:'center'}}>{d.usr.username}</p> }
                                </figure>
                                <div className={'media-content'}>
                                    <div className={''}>
                                        <p>
                                            <Link passHref href={{
                                                pathname:'/auth/question/[id]',
                                                query:{
                                                    //@ts-ignore
                                                    id:d._id}
                                            }}>
                                                <a>
                                                    <strong>
                                                        {//@ts-ignore
                                                            d.subject}
                                                    </strong>
                                                </a>
                                            </Link>

                                            <br/>
                                            <span style={{display:'inline-flex'}}>
                                                 { //@ts-ignore
                                                     d.continent_code !== undefined &&
                                                     //@ts-ignore
                                                     <AGrpTag t={t} leftTag={'my-questions:continent'} tag={GetDisplayContinent(d.continent_code)} color={'is-primary'}/>
                                                 }
                                                &nbsp;
                                                { //@ts-ignore
                                                    d.country_code !== undefined &&
                                                    //@ts-ignore
                                                    d.country_code !== '' &&
                                                    //@ts-ignore
                                                    <AGrpTag t={t} leftTag={'my-questions:country'} tag={GetDisplayCountry(d.country_code)} color={'is-primary'}/>
                                                }
                                                &nbsp;
                                                { //@ts-ignore
                                                    d.state_code !== undefined &&
                                                    //@ts-ignore
                                                    d.state_code !== '' &&
                                                    //@ts-ignore
                                                    <AGrpTag t={t} leftTag={'my-questions:state'} tag={GetDisplayState(d.country_code,d.state_code)} color={'is-primary'}/>
                                                }
                                            </span>
                                            <br/>
                                            <span style={{display:'inline-flex'}}>
                                                 <AGrpTag t={t} leftTag={'my-questions:asked-on'}  tag={moment(d.date).format("MMM Do YYYY")} color={'is-primary'}/>
                                            &nbsp;
                                            <ATag t={t} tag={
                                                //@ts-ignore
                                                d.bIsAnswered ? 'Answered' : 'Not Answered'} color={d.bIsAnswered ? 'is-success': 'is-danger'}/>
                                            </span>

                                            <ABR h={16}/>



                                            <p dangerouslySetInnerHTML={{__html:(xss(
                                                    //@ts-ignore
                                                    d.question))}}/>
                                        </p>
                                    </div>
                                </div>
                                <br/><br/>
                            </article>
                        )
                    })
                }
                <APagination t={t} page={
                    //@ts-ignore
                    data.page} total={ data.totalPages}
                             hasPrevious={
                                 //@ts-ignore
                                 data.hasPrevPage}
                             hasNext={ //@ts-ignore
                                 data.hasNextPage}
                             onClickPage={(p) => {
                                 onClickPage(p);
                             }}
                />
            </section>
        );
    }
    return (<div>loading</div>)
};

