// @ts-nocheck
import React, {Component} from "react";
import Layout from "../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../store/action";
import AHeading from "../components/AHeading";
import ABox from "../components/elements/ABox";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../components/AHiders";
import {LOG_ERROR} from "../utils/logs";
import {ABR} from "../components/elements/ABR";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";

interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
}

interface IState {
    dpi : number
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
                ...(await serverSideTranslations(locale, ['common','Lang','about'])),
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


class AboutPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.state = {
            dpi : 1
        }
    }

    componentDidMount() {
        if (window){
            this.setState({dpi:window.devicePixelRatio});
        }
    }

    render(){
        const {t,bIsAuth} = this.props;
        const {dpi} = this.state;

        const bio = (<div>
            <p className={'is-size-5'} style={{textIndent:'20px'}}>{t('about:gene-1')}</p><br/>
            <p className={'is-size-5'} style={{textIndent:'20px'}}>{t('about:gene-2')}</p><br/>
            <p className={'is-size-5'} style={{textIndent:'20px'}}>{t('about:gene-3')}</p><br/>
            <p className={'is-size-5'} style={{textIndent:'20px'}}>{t('about:gene-4')}</p><br/>
            <p className={'is-size-5'} style={{textIndent:'20px'}}>{t('about:gene-5')}</p>
        </div>);

        return(
            // @ts-ignore
            <Layout t={t} bIsAuth={bIsAuth}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.about')} ~`,
                        keywords:['Gene CoSensei','Gene Decode','Navy veteran','Martial Arts','natural medicine','researcher','physical','mental',
                        'spiritual','biological','social','political','metaphysical','remote viewing','death experience','covenant with God','assist humanity',
                            'Great Awakening'
                        ],
                        description:'Gene CoSensei is a Navy veteran, Martial Arts instructor, lifelong student of natural medicine and Researcher pertaining to all things physical, mental, spiritual, biological, social, political and metaphysical.  His remote viewing skills and death experience enabled him to know the truth. He made a covenant with God to assist humanity in the Great Awakening.\n'
                    }}
                    AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <ADesktopOnly>
                      <span style={{
                          display:'flex',
                          justifyContent:'center'
                      }}>
                          <img style={dpi > 1 ? {} : {height:'210px'}}
                               src={'/imgs/sub_pin.png'}/>
                     </span>
                </ADesktopOnly>
                <AMobileOnly>
                    <br/><br/>  <br/><br/>
                </AMobileOnly>
                <ATabletOnly>
                    <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                </ATabletOnly>
                <AHeading size={'1'}>
                    {t('about:who')}
                </AHeading>
                {
                    //@ts-ignore
                    <ABreadCrumbs t={t} crumbs={[{icon:'user-ninja',display:'common:links.about',url:'/about'}]} onCrumbed={() => {}}/>
                }
                <AMobileOnly>
                    <ABox>
                        {bio}
                    </ABox>
                </AMobileOnly>
                <ATabletOnly>
                    <ABox>
                        {bio}
                    </ABox>
                </ATabletOnly>
                <ADesktopOnly>
                     <span
                     style={{display:'inline-flex'}}
                     >
                    <span
                        style={{width:'20%'}}
                        id={'image-left'}>
                    <div>
                        <img style={{height:'237px',width:'100%'}}
                            src={'/imgs/att-sub.png'}/>
                    </div>
                      <div>  <p style={{textAlign:'center'}}><strong >Attack Submarine</strong></p></div>
                    </span>
                    <span id={'gene-bio'}
                    style={{width:'60%'}}
                    >
                          <ABox>
                    {bio}
                 </ABox>
                    </span>
                    <span
                        style={{width:'20%'}}
                        id={'image-right'}>
                        <div>
                            <img style={{height:'237px',width:'100%'}}
                                src={'/imgs/ssbn-sub.png'}/>
                        </div>
                           <div><p style={{textAlign:'center'}}><strong className={'has-text-centered'}>SSBN Patrol Submarine</strong></p></div>
                    </span>
                </span>
                </ADesktopOnly>

                <ADesktopOnly>
                     <span
                         style={{display:'flex',
                             justifyContent:'space-between'
                         }}
                     >
                     <img style={dpi > 1 ? {} : {paddingRight:'15px'}}
                          src={'/imgs/pin-dolphin-enh.png'}/>
                            <img style={dpi > 1 ? {} : {}}
                                 src={'/imgs/pin-mermaid-enh.png'} />

                    </span>

                </ADesktopOnly>



            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang','about']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(AboutPage);