// @ts-nocheck
import {Component} from "react";
import Layout from "../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {connect} from "react-redux";
import {compose} from "redux";
import ABox from "../components/elements/ABox";
import {ATAbs} from "../components/ui/ATabs";
import {AInterviewCarouselView} from "../components/views/AInterviewCarouselView";
import {AInterviewView} from "../components/views/AInterviewsView";
import {setAuth, setUsr} from "../store/action";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABR} from "../components/elements/ABR";
import AHeading from "../components/AHeading";
import {LOG_ERROR} from "../utils/logs";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";

interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
}

interface IState {
    tabIndex : number
    tabs : [object]
    page : number
    limit : number
}

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

export const  getStaticProps = async ({locale}) =>{
    try{
        return{
            props:{
                ...(await serverSideTranslations(locale, ['common','interviews','Lang'])),
            }
        }
    }catch (e) {
        LOG_ERROR(e);
        return{
            props:{

            }
        }
    }
};


class InterviewPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);

        this.state = {
            tabIndex : 0,
            // @ts-ignore
            tabs : [{ts:'interviews:recent',icon:'microphone-alt'},{ts:'interviews:all',icon:'microphone'}],
            page:1,
            limit:9
        }
    }
    componentDidMount() {
        if (process.browser){
            if (window.devicePixelRatio >= 2){
                this.setState({limit:10});
            }
        }
    }

    render(){
        const {t,bIsAuth} = this.props;
        const {tabIndex,tabs,page,limit} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.past-interviews')} ~`,
                        keywords:['Gene Decode','Blessed for Service','videos','shows','interviews','decodes'],
                        description:'Blessed for Service - Gene Decode past interviews provides all the videos of his shows, interviews and decodes he has done in the past. \n'
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
            <AMobileOnly>
                <ABR h={45}/>
            </AMobileOnly>
                <ATabletOnly>
                    <ABR h={135}/>
                </ATabletOnly>
                <AHeading size={'1'}>
                    {t('common:links.past-interviews')}
                </AHeading>
                <br/>
                <ABreadCrumbs t={t} crumbs={[{display:'common:links.past-interviews',icon:'microphone-stand',url:'/interviews'}
                   ]} onCrumbed={(t) => {

                }}/>
            <ABox>
                {
                    //@ts-ignore
                    <ATAbs t={t} opts={'is-centered'} tabs={//@ts-ignore
                        tabs} onTabSel={(t) => {this.setState({tabIndex:t})}} />
                }
                {tabIndex === 0 &&
                <section>
                    <ABR h={35}/>
                    <AMobileOnly>
                        <AInterviewCarouselView isMobile={true} page={1} limit={3}/>
                    </AMobileOnly>
                    <ATabletOnly>
                        <AInterviewCarouselView isTablet={true} page={1} limit={3}/>
                    </ATabletOnly>
                    <ADesktopOnly>
                        <AInterviewCarouselView page={1} limit={3}/>
                    </ADesktopOnly>

                </section>
                }
                {
                tabIndex === 1 &&
                <section>
                    <AMobileOnly>
                        <ABR h={15}/>
                        <AInterviewView t={t} page={page} limit={3} isMobile={true} onClickPage={(p) => this.setState({page:p})}/>
                    </AMobileOnly>
                    <ATabletOnly>
                        <ABR h={35}/>
                        <AInterviewView t={t} page={page} limit={6} isTablet={true} onClickPage={(p) => this.setState({page:p})}/>
                    </ATabletOnly>
                    <ADesktopOnly>
                        <AInterviewView t={t} page={page} limit={limit} onClickPage={(p) => this.setState({page:p})}/>
                    </ADesktopOnly>

                </section>
                }
            </ABox>
            </Layout>
        )
    }
}

const TS = withTranslation(['common','interviews','Lang']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(InterviewPage);