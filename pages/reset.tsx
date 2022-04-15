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
import {GetServerSideProps} from "next";
import AInputForm from "../components/form/AInputForm";
import {AFloatRight} from "../components/AFloat";
import AButton from "../components/elements/AButton";
import {HandleError} from "../lib/Utils";
import {ANotification} from "../components/elements/ANotification";
import {LOG_ERROR} from "../utils/logs";
import {AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABR} from "../components/elements/ABR";
import router from 'next/router';
import {AIcon} from "../components/elements/AIcon";
import {AMessage} from "../components/elements/AMessage";



interface  IProps {
    t(InTS : string) : string,
    bIsAuth : boolean

};

interface  IState {
    code : string
    pass : string
    confirmPass : string
    resetType : string
    resetState : string
    isPasswordsMatched : string
    bPassLength  : boolean
    bPassLow : boolean
    bPassUp : boolean
    bPassSpecial : boolean
    bPassNumbers : boolean
    warningNote : any
}

export const getServerSideProps : GetServerSideProps = async (ctx) =>{

    try{

        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','forgot','warnings','options','register'])),
                code:ctx.query !== undefined && ctx.query.code !== undefined ? ctx.query.code : ''
            }
        }
    }catch (e) {
        LOG_ERROR(e);
        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','forgot','warnings','options'])),
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

class ResetPage extends Component<IProps , IState>{
    constructor(props) {
        super(props);

        this.state = {
            code:'',
            pass:'',
            confirmPass:'',
            resetState:'',
            resetType:'is-primary',
            isPasswordsMatched:'empty',
            bPassUp:false,
            bPassLow:false,
            bPassNumbers:false,
            bPassSpecial:false,
            bPassLength:false,
            warningNote:null

        } ;

    }

    componentDidMount() {
        // @ts-ignore
        const code = this.props.code !== undefined ? this.props.code : '';
        this.setState({code});
    }

    checkPasswords(){
        const {pass , confirmPass,bPassNumbers,bPassLength,bPassLow,bPassUp,bPassSpecial} = this.state;

        const azLow = /[a-z]/g;
        const azUp = /[A-Z]/g;
        const digits = /[\d]/g;
        const spChara = /[!@#$%^&*]/g;

        this.setState({bPassLength : pass.length >= 8,bPassNumbers : digits.test(pass),
            bPassSpecial: spChara.test(pass),
            bPassUp : azUp.test(pass), bPassLow : azLow.test(pass)});

        if (pass === '' && confirmPass === '') {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }

        if (pass !== '' && confirmPass === '') {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }else if(pass === '' && confirmPass !== '')
        {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }
        if (pass !== confirmPass){
            this.setState({isPasswordsMatched:'mismatch'});

            return;;
        }
        if (pass === confirmPass){
            this.setState({isPasswordsMatched:'match'});
            return;
        }
    }

    handleResetPass(){
        const {isPasswordsMatched,code,pass,bPassSpecial,bPassUp,bPassLow,bPassLength,bPassNumbers} = this.state;
        if ((isPasswordsMatched === 'match') && (bPassLength) && (bPassUp) && (bPassLow) && (bPassSpecial) && (bPassNumbers)){
            const body = {
                code,
                pass
            }
            this.setState({resetState:'is-loading'},() => {
                axNoAuth.post('/reset-pass',body).then((done) => {
                    if(done){
                        this.setState({resetType:'is-success',resetState:''});
                        router.push('/auth/login');
                    }
                }).catch((err) => {
                    const e = HandleError(err);
                    if (e.bIsSuccess){
                        this.setState({warningNote:<ANotification t={this.props.t} color={'is-danger'} message={e.res.warning} onClose={() =>{
                                this.setState({warningNote:null});
                            }}/>});
                    }
                    this.setState({resetState:'',resetType:'is-danger'});
                });
            });

        }
    }

    render()
    {

        const {t,bIsAuth} = this.props;
        const {code,pass,confirmPass,resetState,resetType,isPasswordsMatched,bPassSpecial,bPassUp,bPassLow,bPassLength,
            bPassNumbers} = this.state;

        return(
            // @ts-ignore
            <Layout t={t}  bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
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
                            {t('forgot:reset-pass')}
                        </AHeading>
                        <ABox>
                        <AInputForm t={t} inputType={'text'}
                                    label={'forgot:reset-code'}
                                    inputValue={code} onValue={(v) => this.setState({code:v})}/>
                            <AInputForm t={t} inputType={'password'} inputValue={pass}
                                        isColor={isPasswordsMatched === 'match' ? 'is-success': isPasswordsMatched === 'empty' ? '' : 'is-danger'}
                                        label={'options:new-pass'}      onValue={(v) => this.setState({pass:v},() => this.checkPasswords())}/>
                            <AInputForm t={t} inputType={'password'} inputValue={confirmPass}
                                        isColor={isPasswordsMatched === 'match' ? 'is-success': isPasswordsMatched === 'empty' ? '' : 'is-danger'}
                                        label={'options:confirm-pass'}     onValue={(v) => this.setState({confirmPass:v},() => this.checkPasswords())}/>

                            <article className={'message is-warning'}>
                                <div className={'message-body'}>
                                    <p><span style={{color : bPassLength ? '#23D160' : '#fb9259'}}><AIcon icon={'check'}/></span> &nbsp;{t('register:pass-length')}</p>
                                    <br/>
                                    <p><span style={{color : bPassLow ? '#23D160' : '#fb9259'}}><AIcon icon={'check'}/></span>&nbsp;{t('register:pass-az-low')}</p>
                                    <br/>
                                    <p><span style={{color : bPassUp ? '#23D160' : '#fb9259'}}><AIcon icon={'check'}/></span>&nbsp;{t('register:pass-az-up')}</p>
                                    <br/>
                                    <p><span style={{color : bPassNumbers ? '#23D160' : '#fb9259'}}><AIcon icon={'check'}/></span>&nbsp;{t('register:pass-number')}</p>
                                    <br/>
                                    <p><span style={{color : bPassSpecial ? '#23D160' : '#fb9259'}}><AIcon icon={'check'}/></span>&nbsp;{t('register:pass-special')}</p>
                                </div>
                            </article>
                            {
                                isPasswordsMatched === 'mismatch' && <section>
                                    <AMessage t={t} opt={'is-danger'}
                                              msg={'register:password-mismatch'}/>
                                </section>
                            }

                            {this.state.warningNote !== null && this.state.warningNote}
                            {this.state.warningNote !== null && <ABR h={5}/>}
                                        <AFloatRight>
                                            <AButton t={t} btnText={'forgot:reset-pass'} btnType={resetType}
                                                     btnState={resetState}
                                                     onClicked={()  => {
                                                         if (resetState !== 'is-loading')
                                                             this.handleResetPass();
                                                     }}/>
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

const TS = withTranslation(['common','Lang','warnings','forgot','options','register']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(ResetPage);