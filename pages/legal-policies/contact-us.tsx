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
import AInputForm from "../../components/form/AInputForm";

import {AFloatRight} from "../../components/AFloat";
import AButton from "../../components/elements/AButton";
import {axNoAuth} from "../../utils/axios";
import {AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ABR} from "../../components/elements/ABR";
import ALabel from "../../components/form/ALabel";
import {ADropDown} from "../../components/elements/ADropDown";

import {AMessage} from "../../components/elements/AMessage";
import ARichQuillEditor from "../../components/ui/ARichQuillEditor";
import {ValidEmail} from "../../utils/helpers";




interface  IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
};

interface  IState {
    email : string
    subject : string
    message : string
    contactState : string
    contactType : string
    contactText : string
    concern : string
    concerns : [object]
    bMessageEmpty : boolean
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
            contactState:'',
            contactType:'is-primary',
            contactText:'common:send',
            email:'',
            subject:'',
            message:'',
            bMessageEmpty:true,
            concern:'',
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
            concern,
            date: new Date()
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

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {

    }

    handleCantSend(){
        let bool = true;
        const {email,subject,concern,bMessageEmpty} = this.state;
        if ((ValidEmail(email)) && (subject !== '') && (concern !== '') && (bMessageEmpty !== true))
            bool = false;

        return bool;
    }

    render()
    {

        const {t,bIsAuth} = this.props;
        const {contactState,contactType,email,subject,message,contactText,concern,concerns} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.contact-us')} ~`,
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
                            {t('common:links.contact-us')}
                        </AHeading>
                        <br/>
                        <ABox>

                            <section>
                                <AMessage t={t} opt={'is-warning'} msg={'Please use this contact us form only for your questions regarding privacy and problems with the website or to schedule an interview with Gene. The questions you ask here will not be forwarded to the coordinators. Your personal questions can be emailed to colosensei64@gmail.com. In the future, there will be an "ask your question" section on the page to ask your personal questions.\n'} />
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
                                    <br/>
                               <ARichQuillEditor
                                   height={'360px'}
                                   onChanged={(p) => this.setState({message:p.html,bMessageEmpty:p.isEmpty})}/>
                                   <br/>

                                    <br/>
                                   <AFloatRight>
                                       <AButton t={t} btnText={contactText}
                                                btnState={contactState}
                                                disabled={this.handleCantSend()}
                                                btnType={contactType} onClicked={() => {
                                            if ((contactState !== 'is-loading') && (this.handleCantSend() !== true)){
                                                this.handleNoticeSend();
                                            }
                                       }}/>
                                   </AFloatRight>
                                    <br/>
                                </section>

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