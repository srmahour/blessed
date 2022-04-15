// @ts-nocheck
import {useFetch} from "react-async";
import {Carousel} from 'react-responsive-carousel';
import {useState} from "react";
import moment from "moment";
import {AGrpTag} from "../elements/ATag";
import {ABR} from "../elements/ABR";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../AHiders";
import Link from "next/link";



export const getIFrameByPlatform = (type : string , url : string, width: any, height : any) => {
    switch (type){
        case 'rumble':
            return(
                    <iframe

                        width={width}
                        className={'rumble'}
                        frameBorder={0}  height={height} src={url} allowFullScreen={true}></iframe>

            );
        case 'yt':
            return(
                <iframe
                width={width}
                className={``}
                frameBorder={0}
                height={height}

                src={`https://www.youtube.com/embed/${url}`}
                allowFullScreen={true}
                ></iframe>
            );
        case 'ody':
            return(
                <iframe
                    width={width}
                    className={``}
                    frameBorder={0}
                    height={height}

                    src={`${url}`}
                    allowFullScreen={true}
                ></iframe>
            );
        case 'bit':
            return(
                    <iframe
                        width={width}
                        className={``}
                        frameBorder={0}
                        height={height}

                        src={`https://www.bitchute.com/embed/${url}`}
                        allowFullScreen={true}
                    ></iframe>

            );
        case 'uge':
            return(
                <iframe
                    width={width}
                    className={``}
                    height={height}
                    src={`https://ugetube.com/embed/${url};autoplay=false`}
                    allowFullScreen={true}
                ></iframe>
            );
        case 'vim':
            return(
                <iframe src={`https://player.vimeo.com/video/${url}`} width={width}   height={height}
                        frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
            );
        case 'wsi':
            return(
                <video style={{width,height}} controls={true} autoPlay={false}>
                    <source src={url} type={'video/mp4'} />
                </video>
            )
        default:
            return(<div>Error Iframe</div>)
    }
};



export const AInterviewCarouselView = ({page,limit,isMobile,isTablet}  : {page : number , limit : number,isMobile? : boolean,isTablet? : boolean}) => {

    let url = '/interviews?';

    if (limit)
        url += `limit=${limit}&`;
    if (page)
        url += `page=${page}&`;

    const [isPlay , setPlay] = useState(false);

    const {data,error} = useFetch(`${process.env.NEXT_PUBLIC_BFS_API}${url}`,{
        headers: {accept:'application/json',

        }
    });

    if (error){
        return error.message;
    }

    setTimeout(() => {
        setPlay(true);
    },(6000) * 5);

    if (data){
        return(
            <section>
            <Carousel
            autoPlay={!isPlay}
            showStatus={false}
            stopOnHover={true}
            showThumbs={false}
            swipeable={true}
            onClickItem={() => {
                setPlay(true);
            }}
            >

                {   //@ts-ignore
                    data.docs.map((d : object,i : number) => {
                        let sty = {width:'560px',display:'block'};
                        let w,h;
                        w = 360;
                        h = 640;
                        if (isMobile){
                            sty.width = '50px';
                            h = 180;
                            w = 180;
                        }
                        if (isTablet){
                            w = '100%';
                            h = 360;
                        }
                        return(
                            <div

                                key={i}>
                                    <span >
                                        <strong>
                                         <p style={{display:'flex',justifyContent:'center'}}
                                         >
                                             <AMobileOnly>
                                                  <AGrpTag  leftTag={'Date'} size  tag={moment(d.date).format("MMM Do YYYY")} color={'is-primary'}/>
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
                                             </AMobileOnly>
                                             <ATabletOnly>
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
                                             </ATabletOnly>
                                             <ADesktopOnly>
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
                                             </ADesktopOnly>



                                         </p>
                                            </strong>
                                    </span>
                                <ABR h={5}/>
                                {getIFrameByPlatform(//@ts-ignore
                                    d.type,d.url,w,h)}
                            </div>
                        )
                    })
                }
            </Carousel>
            </section>
        )
    }
    else
    return <p>loading</p>
}