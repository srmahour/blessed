import React, {Component} from "react";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { withTranslation} from "next-i18next";
import Layout from "../components/Layout";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../store/action";
import ABox from "../components/elements/ABox";
import AHeading from "../components/AHeading";
import {axNoAuth} from "../utils/axios";
import xss from "xss";
import moment from "moment";
import {AFloatRight} from "../components/AFloat";
import Link from "next/link";
import {LOG_ERROR, LOG_INFO} from "../utils/logs";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABR} from "../components/elements/ABR";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";



interface  IProps {
t(InTS : string) : string,
bIsAuth : boolean
quotes : object
};

interface  IState {

}

export const  getServerSideProps = async (ctx) =>{


    try{

        const quotesRes = await  axNoAuth.get('quotes?page=1&limit=3');

        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','quotes','documents','statements'])),
                quotes:quotesRes.data
            }
        }
    }catch (e) {
        LOG_ERROR(e);
        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','quotes','documents','statements'])),
            }
        }
    }
};

const mapStateToProps = (state) => {
    const State = state.reducer;
    return {
        bIsAuth:State.bIsAuth,
        usr : State.usr
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        setAuth : (bool) => {dispatch(setAuth(bool))},
        setUsr : (usr) => {dispatch(setUsr(usr))}
    }
}

class LandingPage extends Component<IProps , IState>{
    constructor(props) {
        super(props);

        this.state = {

        } ;

    }



    render()
    {

        const {t,bIsAuth,quotes} = this.props;

        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:'Blessed for Service',
                        keywords:['Blessed for Service','Vision','Great Awakening','Truth','Inspiration',
                        'Resources','service','One True Living God','Humanity','Free'
                        ],
                        description:'Blessed for Service\'s Mission and Vision is to assist humanity during the Great Awakening by providing Truth, Inspiration and Resources, in service to the One True Living God and Humanity, co-creating a world in which  humanity lives Free, truth prevails and all Evil is banned.\n'
                    }}
                    bIsAuth={bIsAuth} AuthRedux={
                        //@ts-ignore
                        {setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <br/>
                <div className={'container'}>
                    <div className={'content'}>
                        <AMobileOnly>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </AMobileOnly>
                        <ATabletOnly>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </ATabletOnly>
                        <AMobileOnly>
                           <span style={{display:'flex',justifyContent:'center'}}>
                                <img src={'/imgs/BFS_Logo_V2.png'}/>
                           </span>
                        </AMobileOnly>
                        <ATabletOnly>
                              <span style={{display:'flex',justifyContent:'center'}}>
                                <img src={'/imgs/BFS_Logo_V2.png'}/>
                           </span>
                        </ATabletOnly>
                        <ADesktopOnly>
                            <AHeading size={'1'}>
                                <img src={'/imgs/BFS_Logo_V2.png'}/>&nbsp;
                            </AHeading>

                        </ADesktopOnly>
                        <br/>
                        <ADesktopOnly>

                            {
                                //@ts-ignore
                                <ABreadCrumbs t={t} crumbs={[]} onCrumbed={() => {}}/>
                            }
                            <ABox>
                                <p style={{fontSize:'30px'}}>
                                    {t('statements:statement')}
                                    <ul>
                                        <li>{t('statements:s1')}</li>
                                        <li>{t('statements:s2')}</li>
                                        <li>{t('statements:s3')}</li>
                                        <li>{t('statements:s4')}</li>
                                        <li>{t('statements:s5')}</li>
                                        <li>{t('statements:s6')}</li>
                                    </ul>
                                    <br/>
                                    <span>
                                        <strong style={{display:'flex',justifyContent:'center'}}>
                                             {t('statements:is-free')}
                                        </strong>
                                    </span>

                                </p>
                            </ABox>
                            <AHeading size={'2'}>
                                {t('statements:vision')}
                            </AHeading>
                            <ABox>
                                <p style={{fontSize:'30px'}}>
                                    {t('statements:v-s')}
                                </p>
                            </ABox>
                            <br/>
                            <AHeading size={'2'}>
                                {t('statements:mission')}
                            </AHeading>
                            <ABox>
                                <p style={{fontSize:'30px'}} >
                                    {t('statements:m-s')}
                                </p>
                            </ABox>
                        </ADesktopOnly>
                        <ATabletOnly>
                            <ABox>
                                <p style={{fontSize:'20px'}}>
                                    {t('statements:statement')}
                                    <ul>
                                        <li>{t('statements:s1')}</li>
                                        <li>{t('statements:s2')}</li>
                                        <li>{t('statements:s3')}</li>
                                        <li>{t('statements:s4')}</li>
                                        <li>{t('statements:s5')}</li>
                                        <li>{t('statements:s6')}</li>
                                    </ul>
                                    <br/>
                                    <span>
                                        <strong style={{display:'flex',justifyContent:'center'}}>
                                             {t('statements:is-free')}
                                        </strong>
                                    </span>
                                </p>
                            </ABox>
                            <AHeading size={'1'}>
                                {t('statements:vision')}
                            </AHeading>
                            <ABox>
                                <p style={{fontSize:'30px'}}>
                                    {t('statements:v-s')}
                                </p>
                            </ABox>
                            <br/>
                            <AHeading size={'1'}>
                                {t('statements:mission')}
                            </AHeading>
                            <ABox>
                                <p style={{fontSize:'30px'}} >
                                    {t('statements:m-s')}
                                </p>
                            </ABox>
                        </ATabletOnly>
                        <AMobileOnly>
                            <ABox>
                                <p style={{fontSize:'20px'}}>
                                    {t('statements:statement')}
                                    <ul>
                                        <li>{t('statements:s1')}</li>
                                        <li>{t('statements:s2')}</li>
                                        <li>{t('statements:s3')}</li>
                                        <li>{t('statements:s4')}</li>
                                        <li>{t('statements:s5')}</li>
                                        <li>{t('statements:s6')}</li>
                                    </ul>
                                    <br/>
                                    <span>
                                        <strong style={{display:'flex',justifyContent:'center'}}>
                                             {t('statements:is-free')}
                                        </strong>
                                    </span>
                                </p>
                            </ABox>
                            <AHeading size={'1'}>
                                {t('statements:vision')}
                            </AHeading>
                            <ABox>
                                <p style={{fontSize:'20px'}}>
                                    {t('statements:v-s')}
                                </p>
                            </ABox>
                            <br/>
                            <AHeading size={'1'}>
                                {t('statements:mission')}
                            </AHeading>
                            <ABox>
                                <p style={{fontSize:'20px'}} >
                                    {t('statements:m-s')}
                                </p>
                            </ABox>
                        </AMobileOnly>


                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>


                        <AHeading size={'1'}>
                            {t('quotes:gene')}
                        </AHeading>


                        <ABox>
                            {   quotes !== undefined &&
                                //@ts-ignore
                                Array.isArray(quotes.docs) &&
                                //@ts-ignore
                            quotes.docs.map((q,i) => {
                                return(
                                    <blockquote key={`q-${i}`}>
                                        <AFloatRight>
                                            <strong>
                                                {moment(q.date).format("MMMM DD HH:mm A")}
                                            </strong>
                                        </AFloatRight>
                                        <p style={{paddingTop:'25px'}}
                                            dangerouslySetInnerHTML={{__html:xss(q.quote)}}/>
                                    </blockquote>
                                )
                            })
                            }
                            <AFloatRight>
                                <Link passHref href={'/quotes'}>
                                    <a>{t('common:links.more')}</a>
                                </Link>
                            </AFloatRight>
                            <br/>
                        </ABox>
                    <br/>
                    </div>
                </div>
            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang','quotes','documents','statements']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(LandingPage);