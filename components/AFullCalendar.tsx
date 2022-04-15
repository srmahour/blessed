//@ts-nocheck
import React, {useEffect, useState} from 'react';
import FullCalendar from "../ext/calendar/react";
import timeGridPlugin from '../ext/calendar/timegrid';
import interactionPlugin from '../ext/calendar/interaction';
import dayGridPlugin from '../ext/calendar/daygrid';
import listGridPlugin from '../ext/calendar/list';
import scrollGridPlugin from '../ext/calendar/scrollgrid';
import timelinePlugin from '../ext/calendar/timeline';
import deLocale from "../ext/calendar/core/locales/de";
import enLocale from "../ext/calendar/core/locales/en-au";
import frLocale from "../ext/calendar/core/locales/fr";
import esLocale from "../ext/calendar/core/locales/es";
import jaLocale from "../ext/calendar/core/locales/ja";
import nlLocale from "../ext/calendar/core/locales/nl";
import afLocale from "../ext/calendar/core/locales/af";
import csLocale from "../ext/calendar/core/locales/cs";
import elLocale from "../ext/calendar/core/locales/el";
import ruLocale from "../ext/calendar/core/locales/ru";
import etLocale from "../ext/calendar/core/locales/et";
import huLocale from "../ext/calendar/core/locales/hu";
import itLocale from "../ext/calendar/core/locales/it";
import plLocale from "../ext/calendar/core/locales/pl";
import ptLocale from "../ext/calendar/core/locales/pt";
import roLocale from "../ext/calendar/core/locales/ro";
import svLocale from "../ext/calendar/core/locales/sv";
import koLocale from "../ext/calendar/core/locales/ko";
import zhLocale from "../ext/calendar/core/locales/zh-tw";
import slLocale from "../ext/calendar/core/locales/sl";
import skLocale from "../ext/calendar/core/locales/sk";
import lvLocale from "../ext/calendar/core/locales/lv";
import ltLocale from "../ext/calendar/core/locales/lt";
import arLocale from "../ext/calendar/core/locales/ar";
import viLocale from "../ext/calendar/core/locales/vi";
import thLocale from "../ext/calendar/core/locales/th";
import idLocale from "../ext/calendar/core/locales/id";
import bgLocale from "../ext/calendar/core/locales/bg";
import fiLocale from "../ext/calendar/core/locales/fi";
import daLocale from "../ext/calendar/core/locales/da";
import {useFetch} from "react-async";
import Cookie from 'js-cookie';
import {LOG_ERROR, LOG_INFO} from "../utils/logs";



//0472313085-fcs-1632315744
export const AFullCalendar =   (props) => {
    const [bEvent,setEvent] = useState(false);
    const [event,setEventObj] = useState({backgroundColor:'',borderColor:'',textColor:'',url:'',title:''});
    const [events,setEvents] = useState([]);
    const [bShouldUpdate,setUpdate] = useState(0);

    const token = Cookie.get('token');

    const {data,error} = useFetch(`${process.env.NEXT_PUBLIC_BFS_API}/schedule?calendar=true`,{
        watch:bShouldUpdate,
        headers :{'accept' :'application/json'
            }
    });
    useEffect(() => {

    },[bShouldUpdate]);
    if (error){
        LOG_ERROR(error);
    }
    if (data){
        LOG_INFO('1')
        setTimeout(() =>  setEvents(data),60);
        return(
            <div>
            <FullCalendar

                headerToolbar={{
                    left:props.isMobile ? 'prev,next' : props.isTablet ? 'prev,next' : 'prev,next today',
                    center:'title',
                    right:props.isMobile ? '' : props.isTablet ? 'listMonth,timeGridWeek,timeGridDay' : 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                plugins={[interactionPlugin,timeGridPlugin,dayGridPlugin,listGridPlugin,scrollGridPlugin,timelinePlugin]}
                initialView={ props.isMobile ? 'listMonth' : props.isTablet ? 'listMonth' : 'listMonth'}
                schedulerLicenseKey={'0472313085-fcs-1632315744'}
                events={events}
                nowIndicator={true}
                editable={false}
                locales={[enLocale,deLocale,jaLocale,nlLocale,esLocale,frLocale,afLocale,csLocale,bgLocale,daLocale,
                    elLocale,ruLocale,etLocale,fiLocale,huLocale,itLocale,plLocale,ptLocale,roLocale,svLocale,
                    skLocale,koLocale,zhLocale,lvLocale,ltLocale,arLocale,viLocale,thLocale,idLocale,slLocale

                ]}
                locale={props.i18n ? props.i18n.language : 'en'}
                selectable={false}
                dateClick={(info) => {

                }}
                eventClick={(info) => {
                    info.jsEvent.preventDefault();
                    if (info.event.url){
                        console.log(info.event.url)
                        if (typeof info.event.url === 'string'){
                            if (info.event.url !== ''){
                                window.open(info.event.url);
                            }
                        }

                    }
                }}



            />


    </div>
        );
    }
    else
    return(
        <span>

        Calendar Data not loaded


        </span>
    )
}


