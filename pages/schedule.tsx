import React, {Component} from "react";
import Layout from "../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AHeading from "../components/AHeading";
import ABox from "../components/elements/ABox";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../store/action";
import {AFullCalendar} from "../components/AFullCalendar";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../components/AHiders";
import {LOG_ERROR} from "../utils/logs";
import {ABR} from "../components/elements/ABR";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";




interface IProps {
    t(InTS : string) : string
    bIsAuth : boolean
    schedule : [object]
}

interface IState{
    page : number,
    limit : number
}

// @ts-ignore

export const  getStaticProps = async ({locale}) =>{
    try{

        return{
            props:{
                ...(await serverSideTranslations(locale, ['common','Lang','privacy','common']))

            }
        }
    }catch (e) {
        LOG_ERROR(e);
        return{
            props:{
                ...(await serverSideTranslations(locale, ['common','Lang','privacy','common'])),
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

class SchedulePage extends Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.state = {
            page:1,
            limit:10,

        }
    }

    componentDidMount() {

    }

    render(){
        const {t,bIsAuth} = this.props;
        const {page , limit} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.gene-schedule')} ~`,
                        keywords:['Blessed for Service','Gene Decode Schedule','shows','interviews','online platforms','youtube','bitchute','rumble',
                        'telegram','shows'
                        ],
                        description:'Blessed for Service - Gene Decode schedule provides information on the date and time of his shows or interviews and on what online platforms (Youtube, Bitchute, Rumble, Telegram, etc.) he will be appearing and provides links leading to these shows.\n'
                    }}
                    bIsAuth={bIsAuth} AuthRedux={
                        // @ts-ignore
                        {setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <AMobileOnly>
                    <br/><br/>  <br/><br/>
                </AMobileOnly>
                <ATabletOnly>
                    <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                </ATabletOnly>
                <AHeading size={'1'}>
                    {t('common:links.gene-schedule')}
                </AHeading>
                <br/>
                {
                    //@ts-ignore
                    <ABreadCrumbs t={t} crumbs={[{icon:'calendar-alt',display:'common:links.gene-schedule',url:'/schedule'}]} onCrumbed={() => {}}/>
                }
                <ABox>
                    <AMobileOnly>
                        <AFullCalendar
                            isMobile={true}
                            isTablet={false}
                            i18n={//@ts-ignore
                                this.props.i18n}
                        />
                    </AMobileOnly>
                    <ATabletOnly>
                        <AFullCalendar
                            isTablet={true}
                            isMobile={false}
                            i18n={//@ts-ignore
                                this.props.i18n}
                        />
                    </ATabletOnly>
                    <ADesktopOnly>
                        <AFullCalendar
                            i18n={//@ts-ignore
                                this.props.i18n}
                        />
                    </ADesktopOnly>

                </ABox>
            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(SchedulePage);