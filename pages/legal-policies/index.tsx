// @ts-nocheck
import React, {Component} from "react";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { withTranslation} from "next-i18next";
import Layout from "../../components/Layout";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../../store/action";
import {LOG_ERROR, LOG_INFO} from "../../utils/logs";
import AHeading from "../../components/AHeading";
import ABox from "../../components/elements/ABox";
import {ATAbs} from "../../components/ui/ATabs";
import {APrivacyStatement} from "../../components/views/APrivacyStatement";
import AInputForm from "../../components/form/AInputForm";
import {ARichEditor} from "../../components/elements/ARichEditor";
import {AFloatRight} from "../../components/AFloat";
import AButton from "../../components/elements/AButton";
import {axNoAuth} from "../../utils/axios";
import {AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ABR} from "../../components/elements/ABR";
import ALabel from "../../components/form/ALabel";
import {ADropDown} from "../../components/elements/ADropDown";




interface  IProps {
    t(InTS : string) : string,
    bIsAuth : boolean

};

interface  IState {
    tabs : [object]
    tabIndex : number
    email : string
    subject : string
    message : string
    contactState : string
    contactType : string
    contactText : string
    concern : string
    concerns : [object]
}

export const  getServerSideProps = async (ctx) =>{

    try{

        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','privacy','disclaimer'])),


            }
        }
    }catch (e) {
        LOG_ERROR(e);
        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','privacy','disclaimer'])),
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

class LegalPoliciesPage extends Component<IProps , IState>{
    constructor(props) {
        super(props);

        this.state = {
            //@ts-ignore
            tabs:[{icon:'user-secret',ts:'privacy:statement'},
                {icon:'exclamation-square',ts:'disclaimer:disclaimer'},
                {icon:'star-exclamation',ts:'disclaimer:fair-notice'},{icon:'envelope-open-text',ts:'privacy:contact-us'}],
            tabIndex:0,
            contactState:'',
            contactType:'is-primary',
            contactText:'common:send',
            email:'',
            subject:'',
            message:'',
            concern:'privacy',
            // @ts-ignore
            concerns:[{display:'privacy:privacy-fair-use',value:'privacy-fair'},
                {display:'privacy:schedule-interview',value:'interview'},
                {display:'privacy:website-issues',value:'issues'}
                    ]
        } ;

    }

    handleNoticeSend(){
        const {email,subject,message,concern} = this.state;

        const body = {
            email,
            subject,
             message,
            concern
        };
        this.setState({contactState:'is-loading'},() => {
            axNoAuth.post('/send-concern-inquiry',body).then((done) => {
                if (done){
                    this.setState({contactState:'',contactText:'common:sent',contactType:'is-success'});
                }
            }).catch((err) => {
                console.error(err);
                LOG_ERROR(err);
                this.setState({contactState:'',contactText:'common:send',contactType:'is-danger'});
            });
        });

    }

    componentDidMount() {

    }

    render()
    {

        const {t,bIsAuth} = this.props;
        const {tabIndex,tabs,contactState,contactType,email,subject,message,contactText,concern,concerns} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.legal-policies')} ~`,
                        description:''
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <br/>
                <div className={'container'}>
                    <div className={'content'}>
                        <AMobileOnly>
                            <ABR h={45}/>
                        </AMobileOnly>
                        <ATabletOnly>
                            <ABR h={85}/>
                        </ATabletOnly>
                        <AHeading size={'1'}>
                            {t('common:links.legal-policies')}
                        </AHeading>
                        <br/>
                        <ABox>
                            <ATAbs t={t} tab={tabIndex} tabs={tabs} opts={'is-centered'} onTabSel={(t) => this.setState({tabIndex:t})}/>
                            {
                                tabIndex === 0 && <section>
                                    <ABR h={15}/>
                                  <APrivacyStatement t={t} bScroll={false}/>
                                </section>
                            }
                            {
                                tabIndex === 1 && <section>
                                    <ABR h={15}/>
                                    <article
                                    style={{backgroundColor:'#a4cdec',
                                        borderRadius:'4px',
                                        padding:'5px',
                                    }}
                                    >
                                    <p style={{color:'blue',textIndent:'16px'}}>
                                        {t('disclaimer:d-blurb')}
                                    </p>
                                    </article>
                                </section>
                            }
                            {
                                tabIndex === 2 && <section>
                                    <ABR h={15}/>
                                    <article
                                        style={{backgroundColor:'#a4cdec',
                                            borderRadius:'4px',
                                            padding:'5px',
                                        }}
                                    >
                                        <p style={{color:'blue',textIndent:'16px'}}>
                                            {t('disclaimer:fair-blurb')}
                                        </p>
                                    </article>
                                </section>
                            }
                            {
                                tabIndex === 3 && <section>
                                    <ABR h={15}/>
                                <AInputForm t={t} inputType={'email'}
                                            label={'privacy:email-adr'}
                                            inputValue={email} onValue={(v) => this.setState({email:v})}/>
                                <AInputForm t={t} inputType={'text'}
                                            label={'privacy:subject'}
                                            inputValue={subject} onValue={(v) => this.setState({subject:v})}/>
                                            <ALabel>
                                                {t('privacy:concerns')}
                                            </ALabel>
                                    <ADropDown t={t} dropText={'privacy:concerns'}  list={concerns} onSelected={(t) => {
                                        this.setState({concern:t});
                                    }}/>
                               <ARichEditor
                                   height={368}
                                   onChanged={(p) => this.setState({message:p.html})}/>
                                   <br/>
                                   <AFloatRight>
                                       <AButton t={t} btnText={contactText}
                                                btnState={contactState}
                                                btnType={contactType} onClicked={() => {
                                            if (contactState !== 'is-loading'){
                                                this.handleNoticeSend();
                                            }
                                       }}/>
                                   </AFloatRight>
                                    <br/>
                                </section>
                            }
                        </ABox>
                    </div>
                </div>
            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang','privacy','disclaimer']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(LegalPoliciesPage);