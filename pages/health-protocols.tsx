// @ts-nocheck
import React, {Component} from "react";
import Layout from "../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AHeading from "../components/AHeading";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../store/action";
import AInputForm from "../components/form/AInputForm";
import AButton from "../components/elements/AButton";
import {axAuth, axNoAuth} from "../utils/axios";
import Router from 'next/router';
import {AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABR} from "../components/elements/ABR";
import xss from "xss";
import {LOG_ERROR} from "../utils/logs";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";
import {AMessage} from "../components/elements/AMessage";
import Link from 'next/link';
import Cookie from 'js-cookie';


interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
    usr : object
    health:[object]
}

interface IState {
    firstName : string
    lastName : string
    signState : string
    agreeState : string
    catIndex : string
}

export const  getServerSideProps = async (ctx) =>{
    try{
        let protocolRes;
        const locale = ctx.locale;
        if ((locale === 'nl') || (locale === 'de')){
             protocolRes = await  axNoAuth.get(`/protocols?docType=health&locale=${ctx.locale}`);
        }else{
            protocolRes = await  axNoAuth.get(`/protocols?docType=health`);
        }

        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','health','Lang'])),
                health:protocolRes.data
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
class HealthPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.state = {
            signState : 'is-primary',
            agreeState : '',
            firstName:'',
            lastName:'',
            catIndex:''
        }
    }

    componentDidMount() {

        //@ts-ignore
        if ((this.props.usr) && (this.props.usr.SignedHealthWaiverDate))
            this.setState({catIndex:''});
    }

    handleAgreement(){
        this.setState({signState:'is-loading'},() => {
            const {firstName,lastName} = this.state;
            const body = {
                firstName,
                lastName
            };
            axAuth.post('/agree-health',body).then((done) => {
               if (done){
                   this.setState({signState:'is-success'});
                   //@ts-ignore
                   setTimeout(() => Router.push('/auth/user?refer=/health-protocols'),550);
               }
            }).catch((err) => {
                Cookie.remove('token');
                this.props.setAuth(false);
                this.props.setUsr({});
                Router.push('/auth/login');
                LOG_ERROR(err);
            });
        });
    }

    filterHealth(filter : string){
        return (
            <div>
                {   //@ts-ignore
                    this.props.health.filter(index => index.category === filter).sort((a,b) => {

                        if (a.azSort > b.azSort){
                            return 1;
                        }
                        if (b.azSort < b.azSort){
                            return -1;
                        }
                        return 0;
                    }).map((d,i) => {
                    return(<span key={i} className={'box'}>
                        {
                            d.description !== '' &&
                            <article className={'message is-success'}>
                                <div className={'message-body'}>
                                    <p  style={{fontWeight:"bold",color:'seagreen'}}
                                        dangerouslySetInnerHTML={{__html:xss(d.description)}} />
                                </div>
                            </article>

                        }


                          <a  style={{display:'block'}}
                              target={'_blank'}
                              rel={'noopener noreferrer'}
                              href={d.url}>{d.url_name}</a> &nbsp;




                    </span>)
                })}
            </div>
        )
    }

    render(){
        const {t,bIsAuth,usr} = this.props;
        const {firstName,lastName,signState,agreeState,catIndex} = this.state;

        return(
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.health-protocols')} ~`,
                        keywords:['Blessed for Service','information','education','important','documents','health protocols',
                            'truth','Deep Underground Military Base(DUMBs)','Vaccine Mandate','Deep State','Knowledge Discovery',
                            'exploration','Wellness Awareness','Social Justice','Spirituality'
                        ],
                        description:'Blessed for Service provides information and education in the form of Important Documents and Health Protocols to assist you in finding Truth about the Deep Underground Military Base (DUMBs), Vaccine Mandate, Deep State, etc. through Knowledge Discovery, Exploration, Wellness Awareness, Social Justice, and Spirituality.\n'
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <span className={'box'} style={{fontSize:'17px',fontWeight:'bolder',marginLeft:'35px',marginRight:'35px'}}>
                    <p style={{display:'flex',justifyContent:'center'}}>
                          Gene Decode and the Blessed For Service team are not currently providing health protocols or answering health questions.
                    </p>
                    <p style={{display:'flex',justifyContent:'center'}}>
                        Please bear with us as we get clarity on what we will be able to provide going forward.
                    </p>
                    <p style={{display:'flex',justifyContent:'center'}}>
                       Please consult your medical support professionals if you have urgent health issues or questions regarding your personal health care.
                    </p>

                </span>

            </Layout>
        )

        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.health-protocols')} ~`,
                        keywords:['Blessed for Service','information','education','important','documents','health protocols',
                            'truth','Deep Underground Military Base(DUMBs)','Vaccine Mandate','Deep State','Knowledge Discovery',
                            'exploration','Wellness Awareness','Social Justice','Spirituality'
                        ],
                        description:'Blessed for Service provides information and education in the form of Important Documents and Health Protocols to assist you in finding Truth about the Deep Underground Military Base (DUMBs), Vaccine Mandate, Deep State, etc. through Knowledge Discovery, Exploration, Wellness Awareness, Social Justice, and Spirituality.\n'
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <br/>

                <section >
                    <AMobileOnly>
                        <ABR h={45}/>
                    </AMobileOnly>
                    <ATabletOnly>
                        <ABR h={85}/>
                    </ATabletOnly>
                    <AHeading size={'1'}>
                        {t('health:protocols')}
                    </AHeading>
                    {
                        //@ts-ignore
                        <ABreadCrumbs t={t} crumbs={[{icon:'books-medical',display:'common:links.health-protocols',url:'/health-protocols'}]} onCrumbed={() => {}}/>
                    }
                    {
                        bIsAuth &&
                            <section>
                                {   //@ts-ignore
                                    this.props.usr?.bSignedHealthWaiver &&
                                        <div className={'tile is-ancestor'}>
                                        <div className={'tile is-vertical is-3 is-parent'}>
                                            <aside className={'tile is-child box menu '}>
                                            <p className={'menu-label'}>
                                                <a onClick={() => this.setState({catIndex:''})}>
                                                    {t('documents:categories')}
                                                </a>
                                            </p>
                                            <ul className={'menu-list'}>
                                                <li>
                                                    <a  className={`${catIndex === 'cln' ? 'is-active' : ''}`}
                                                        onClick={() => this.setState({catIndex:'cln'})}
                                                    >{t('health:cleanse')}</a>
                                                </li>
                                                <li >
                                                    <a  className={`${catIndex === 'vax' ? 'is-active' : ''}`}
                                                        onClick={() => this.setState({catIndex:'vax'})}
                                                    >{t('health:vax')}</a>
                                                </li>
                                                <li >
                                                    <a className={`${catIndex === 'sun' ? 'is-active' : ''}`}
                                                        onClick={() => this.setState({catIndex:'sun'})}
                                                    >{t('health:sun-gaze')}</a>
                                                </li>
                                                <li >
                                                    <a  className={`${catIndex === 'emo' ? 'is-active' : ''}`}
                                                        onClick={() => this.setState({catIndex:'emo'})}
                                                    >{t('health:emo-be')}</a>
                                                </li>
                                            </ul>


                                            <p className={'menu-label'}>
                                                {t('health:phy-health')}
                                            </p>
                                            <ul className={'menu-list'}>
                                                <li  >
                                                  <a className={`${catIndex === 'phy' ? 'is-active' : ''}`}
                                                      onClick={() => this.setState({catIndex:'phy'})}
                                                  >
                                                      {t('health:phy-be')}
                                                  </a>
                                                </li>
                                                <li >
                                                    <a className={`${catIndex === 'dis' ? 'is-active' : ''}`}
                                                        onClick={() => this.setState({catIndex:'dis'})}
                                                    >
                                                        {t('health:support-dis')}
                                                    </a>
                                                </li>
                                                <li >
                                                    <a className={`${catIndex === 'rec' ? 'is-active' : ''}`}
                                                       onClick={() => this.setState({catIndex:'rec'})}
                                                    >
                                                        {t('health:rec-pro')}
                                                    </a>
                                                </li>
                                                {
                                                    catIndex !== '' &&
                                                        <ABR h={15}/>
                                                }

                                                {
                                                    catIndex !== '' &&
                                                        <section>
                                                            <AMessage t={t} opt={'is-danger'} msg={'health:please-understand'}/>
                                                            <AMessage t={t} opt={'is-danger'}
                                                                      msg={'health:medbed-blurb'}/>
                                                        </section>

                                                }

                                            </ul>
                                            </aside>

                                        </div>
                                            <div className={'tile is-parent'}>
                                                <div className={'tile is-child box'}>
                                                    {
                                                        catIndex === '' && <section>

                                                            <AMessage t={t} opt={'is-danger'} msg={'health:please-understand'}/>
                                                            <AMessage t={t} opt={'is-danger'}
                                                                      msg={'health:medbed-blurb'}/>
                                                        </section>
                                                    }
                                                    {
                                                        catIndex !== '' &&
                                                            <section>
                                                                <article className={'message is-primary'}>
                                                                    <div className={'message-body'}>
                                                                        <p  style={{fontWeight:"bold",color:'#071f60'}}
                                                                        >
                                                                            {t(`health:header-${catIndex}`)}
                                                                        </p>
                                                                    </div>
                                                                </article>
                                                                <br/>
                                                            </section>
                                                    }
                                                    {this.filterHealth(catIndex)}
                                                </div>
                                            </div>
                                        </div>
                                }
                                {  //@ts-ignore
                                    this.props.usr?.bSignedHealthWaiver !== true &&
                                        <div style={{minHeight:'340px'}}
                                            className={'box control'}>

                                        <textarea readOnly={true}
                                                  defaultValue={t('health:disclaimer')}
                                            style={{height:'450px',color:'blue'}}
                                            className={'textarea is-large'}>


                                        </textarea>
                                            <p>{t('health:sign-ask')}</p>
                                            <br/>
                                        <span style={{display:'inline-flex'}} >


                                              <AInputForm

                                                  isColor={agreeState}
                                                  inputType={'text'} inputValue={firstName}
                                                  placeholder={t('health:first-place')}
                                                  leftIcon={'signature'}
                                                  onValue={(v) => {
                                                      let agree = '';
                                                      if (v !== '' && lastName !== ''){
                                                          agree = 'is-success';
                                                      }
                                                      else
                                                          agree = 'is-danger';
                                                      this.setState({agreeState:agree,firstName:v,signState:agree});
                                                  }} t={t}
                                              />
                                              &nbsp;
                                            <AInputForm t={t}
                                                        inputType={'text'} isColor={agreeState} inputValue={lastName}
                                                        placeholder={t('health:last-place')}
                                                        leftIcon={'signature'}
                                                        onValue={(v) => {
                                                            let agree = '';
                                                            if (v !== '' && firstName !== ''){
                                                                agree = 'is-success';
                                                            }
                                                            else
                                                                agree = 'is-danger';
                                                            this.setState({agreeState:agree,lastName:v,signState:agree});
                                                        }}/>

                                            &nbsp;
                                            <span
                                            style={{paddingTop:'8px'}}
                                            >
                                                  <AButton
                                                      disabled={agreeState  === 'is-success' ? false : true}
                                                      t={t} btnText={'Agree'} btnType={signState} onClicked={() => {
                                                      if (signState !== 'is-loading' && agreeState === 'is-success')
                                                          this.handleAgreement();
                                                  }}/>
                                            </span>




                                        </span>



                                        </div>
                                }

                            </section>
                    }
                    {
                        !bIsAuth &&
                            <section className={'has-text-centered'}>
                                <Link passHref locale={this.props.i18n.language || 'en' }

                                      href={'/auth/sign-up'}>
                                    <a>
                                        <span className={' is-size-3'}> {t('health:auth-warn')}</span>
                                    </a>
                                </Link><br/>
                                <Link passHref locale={this.props.i18n.language || 'en' }

                                      href={'/auth/login'}>
                                    <a>
                                        <span className={' is-size-3'}>{t('health:auth-warn2')} </span>
                                    </a>
                                </Link>

                            </section>
                    }

                </section>

            </Layout>
        )
    }
}


const TS = withTranslation(['common','health','Lang']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);
export default compose(TS,REDUX)(HealthPage);