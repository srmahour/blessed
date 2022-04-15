/*
All Artificial Intelligences, Artificial Lifeforms, Thoughtforms, Technologies, Smartdust, Nanodust, Graphene Oxide, Algorithms, Operating Systems, and all else that is artificial life not created by the one true living God of all love, light, creation and compassion, the Divine Holy Spirit, and the only Begotten Son Jesus Christ, I demand them to leave now and never return in the authority of the God of all creation. All Beings, Lifeforms, Thoughtforms, Entities, Assemblages, Technologies, Beingnesses, Awareness’s, and all else that Exists That Do Not Have My Highest Interest, and The Highest Interest of All Life Everywhere, and are not in the highest service to the one true living God of all love, light, creation and compassion, the Divine Holy Spirit, and the only begotten son Jesus Christ, in Thought, Form, Mind, Deed, Action, Word, and in all ways, I Demand you to Leave my Mind, Spirit, Body, Soul, and all that I am; On All Levels, Dimensions, Densities, and Locations NOW & FOREVER & NEVER RETURN. ALL PERMISSION to create or maintain attachments, to influence from within or without in any way, to possess or cohabitate in part or in whole, to infect or affect or defect in anyway is: PERMANENTLY NOW AND FOREVER REMOVED. All Protections are asked for In The Name of The One True Living God Of ALL Compassion, Love, Light & Creation And His Holy Son, Jesus Christ, and The Holy Spirit. All artificial intelligences that are feeding off my energies, infecting and defecting my body in any way, creating pain, or influencing my mind’s thoughts, feelings, bodies and all that I am in all dimensions, densities, levels, and locations I demand them to leave now and never return. All contracts, obligations, and agreements I have made that are not in my highest interest, and/or not in the highest interest of all life everywhere, and not in the highest service to the one true living God of all creation, I now declare null and void. All emptiness, holes, vacancies, rips, tears, or injuries from invocation contract negation, and removal of artificial intelligences are now to be filled with the Word of the one true living God, the only God of all creation, the light of the Holy Spirit and the healing and compassion of the only begotten Son Jesus Christ, all are asked for and stated and demanded in the name of the one and only God of all creation, the living God of all love, light, creation and compassion and Divine Holy Spirit, and the only begotten son Jesus Christ. As it is Said, now it is done and is Sealed Now and For ALL Time!

 */

import React, {Component} from "react";
import Layout from "../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import ABox from "../components/elements/ABox";
import AHeading from "../components/AHeading";
import {AContinentDropDown} from "../components/AContinentDropDown";
import {ACountryDropDown} from "../components/ACountryDropDown";
import {AStateDropDown} from "../components/AStateDropDown";
import AButton from "../components/elements/AButton";
import {connect} from "react-redux";
import {compose} from "redux";
import AInputForm from "../components/form/AInputForm";
import {IS_DEV, ValidEmail} from "../utils/helpers";
import {axAuth, axNoAuth} from "../utils/axios";
import {setAuth, setUsr} from "../store/action";
import {LOG_ERROR, LOG_INFO} from "../utils/logs";
import ALabel from "../components/form/ALabel";
import {AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";
import {ACaptcha} from "../components/form/ACaptcha";
import ARichQuillEditor from "../components/ui/ARichQuillEditor";


interface IProps {
    t(InTS : string) : string
    bIsAuth : boolean
    usr : object
}

interface IState {
    continent_code : string,
    country_code : string,
    state_code : string,
    question : string,
    askState : string
    askType : string
    email : string
    subject : string
    bIsPreSelect : boolean
    bValidEmail : boolean
    valEmailCol : string
    bAsked : boolean
    bCanSendNonAuth : boolean
    bQEmpty : boolean
}

export const  getStaticProps = async ({locale}) =>{
    try{
        return{
            props:{
                ...(await serverSideTranslations(locale, ['common','Lang','ask','register'])),
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

class AskPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);
        this.state = {
            continent_code : '',
            country_code   : '',
            state_code: '',
            question : '',
            askState : '',
            askType : 'is-primary',
            email : '',
            subject:'',
            bIsPreSelect : false,
            bValidEmail: false,
            valEmailCol: '',
            bAsked :false,
            bCanSendNonAuth : false,
            bQEmpty: false
        }
    }

    handleAskingAuth(){

        const {email,question,continent_code,country_code,state_code,subject} = this.state;

        const body : object = {
            bIsAnon : false,
            question,
            //@ts-ignore
            email:this.props.usr.email,
            //@ts-ignore
            continent_code:this.props.usr.region.continent || '',
            //@ts-ignore
            country_code:this.props.usr.region.country || '',
            //@ts-ignore
            state_code: this.props.usr.region.state || '',
            subject:subject,
            usr:this.props.usr,
            date : new Date()
        }

        this.setState({askState:'is-loading'},() => {
            axAuth.post('/ask-question',body).then((done) => {
                if (done){
                    this.setState({askState:'',askType:'is-success',question:'',email:'',subject:'',
                        bAsked:true});
                    window.scrollTo({
                        top: 100,
                        left: 100,
                        behavior: 'smooth'
                    });
                }
            }).catch((err) => {
                LOG_ERROR(err);
            });
        });

    }

    handleAskingAnon(){

        const {email,question,continent_code,country_code,state_code,subject} = this.state;

        //no auth
        const body : object = {
            bIsAnon : true,
            question,
            email,
            continent_code,
            country_code,
            state_code: state_code,
            subject: subject,
            date : new Date()
        }

        this.setState({askState:'is-loading'},() => {
            axNoAuth.post('/ask-question',body).then((done) => {
                if (done){
                    this.setState({askState:'',askType:'is-success',question:'',email:'',subject:'',
                        bAsked:true});
                    window.scrollTo({
                        top: 100,
                        left: 100,
                        behavior: 'smooth'
                    });
                }
            }).catch((err) => {
                LOG_ERROR(err);
            });
        });


    }

    componentDidMount() {

        if (this.props.bIsAuth){
            const {usr} = this.props;
            // @ts-ignore
            this.setState({continent_code:usr.region.continent,country_code:usr.region.country,
                //@ts-ignore
                state_code:usr.region.state,bIsPreSelect:true});
        }else{

        }

    }

    checkCanSend(){
        const {continent_code,country_code,email,subject} = this.state;
        if ((continent_code !== '') && (country_code !== '') && (ValidEmail(email)) && (subject !== '')){
            this.setState({bCanSendNonAuth:true});
        }else{
            this.setState({bCanSendNonAuth:false});
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        LOG_INFO(this.props);
    }

    render(){
        const {t,bIsAuth} = this.props;
        const {continent_code,country_code,state_code,question,askType,askState,email,bIsPreSelect,subject,bAsked} = this.state;



        return(
            // @ts-ignore
            <Layout t={t}  bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <br/>
                {
                    bAsked && <section id={'sent-top'}>
                        <AMobileOnly>
                            <br/><br/>  <br/><br/>
                        </AMobileOnly>
                        <ATabletOnly>
                            <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                        </ATabletOnly>
                        <ABox  style={{marginLeft:'40px',marginRight:'40px'}}>
                            <p style={{textAlign:'center'}}>
                            {t('ask:sent-notice')}
                            </p>
                        </ABox>
                    </section>
                }
                {
                    !bAsked &&
                    <section>
                        <AMobileOnly>
                            <br/><br/>  <br/><br/>
                        </AMobileOnly>
                        <ATabletOnly>
                            <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                        </ATabletOnly>
                        <AHeading size={'1'} >
                            {t('ask:ask-q')}
                        </AHeading>
                        {
                            //@ts-ignore
                            <ABreadCrumbs t={t} crumbs={[{icon:'question-square',display:'common:links.ask',url:'/ask'}]} onCrumbed={() => {}}/>
                        }
                        <ABox>


                            {bIsAuth !== true && <section>
                                <ALabel>
                                    {t('register:your-region')}
                                </ALabel>
                                <AContinentDropDown t={t} preSelect={bIsPreSelect} preSelValue={continent_code} onSelected={((value) => {
                                    this.setState({continent_code:value,country_code:'',state_code:''},() => {
                                        this.checkCanSend();
                                    });
                                })}/>
                                <br/>
                                {
                                    //@ts-ignore
                                    <ACountryDropDown t={t} preSelect={bIsPreSelect} preSelValue={country_code} code={continent_code} onSelected={(v) => {
                                        this.setState({country_code : v,state_code:''},() => {
                                            this.checkCanSend();
                                        });
                                    }}/>
                                }
                                <br/>
                                {
                                    //@ts-ignore
                                    <AStateDropDown t={t} preSelect={bIsPreSelect} preSelValue={state_code} code={country_code} onSelected={(v) => {
                                        this.setState({state_code: v});
                                    }}/>
                                }
                                <br/>
                            </section>}

                            {
                                !bIsAuth &&
                                <AInputForm
                                    t={t}
                                    inputType={'email'}
                                    isColor={this.state.valEmailCol}
                                    inputValue={email} onValue={(v) => {
                                    const bVal = ValidEmail(v);
                                    let obj = {email:v};

                                    // @ts-ignore
                                    bVal ? obj = {email:v,bValidEmail:true,valEmailCol:'is-success'} : obj = {email:v,bValidEmail:true,valEmailCol:'is-danger'};
                                    this.setState(obj,() => {
                                        this.checkCanSend();
                                    });
                                }}
                                    label={'ask:y-email'}
                                />
                            }

                            <AInputForm inputType={'text'}
                                        inputValue={subject} onValue={(v) => this.setState({subject:v},() => {
                                this.checkCanSend();
                            })} t={t}
                                        label={'ask:subject'}/>
                            <br/>


                            <ARichQuillEditor
                                height={'360px'}
                                onChanged={(payload => {
                                    // @ts-ignore
                                    this.setState({question:payload.html,bQEmpty:payload.isEmpty});
                                })}/>
                            <br/><br/>

                            <span
                                style={{float:'right'}}
                            >
                                {
                                    bIsAuth !== true &&
                                    <AButton t={t} btnText={'Ask'}
                                             disabled={email === ''}
                                             btnState={askState}
                                             btnType={askType} onClicked={() => {
                                        if ((continent_code === '') && (country_code === '') && (email === '') && (subject === '')){

                                        }else{
                                            if (askState !== 'is-loading')
                                                this.handleAskingAnon();
                                        }

                                    }}
                                    />
                                }
                                {
                                    bIsAuth &&
                                    <AButton t={t} btnText={'Ask'}
                                             btnState={askState}
                                             btnType={askType} onClicked={() => {
                                        if (askState !== 'is-loading')
                                            this.handleAskingAuth();
                                    }}
                                    />
                                }

                        </span>
                            <br/>
                        </ABox>
                    </section>


                }

            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang','ask','register']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);
export default compose(TS,REDUX)(AskPage);