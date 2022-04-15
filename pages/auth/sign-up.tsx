// @ts-nocheck
import React, {Component} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Layout from "../../components/Layout";
import {withTranslation} from "next-i18next";
import AHeading from "../../components/AHeading";
import ABox from "../../components/elements/ABox";
import AInputForm from "../../components/form/AInputForm";
import AButton from "../../components/elements/AButton";
import {axNoAuth} from "../../utils/axios";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../../store/action";
import {AContinentDropDown} from "../../components/AContinentDropDown";
import {ACountryDropDown} from "../../components/ACountryDropDown";
import {AStateDropDown} from "../../components/AStateDropDown";
import {APrivacyStatement} from "../../components/views/APrivacyStatement";
import {LOG_ERROR} from "../../utils/logs";
import ALabel from "../../components/form/ALabel";
import {AHelp} from "../../components/ui/AHelp";
import {HandleError} from "../../lib/Utils";
import {ANotification} from "../../components/elements/ANotification";
import router from 'next/router';
import {ABreadCrumbs} from "../../components/elements/ABreadcrumbs";
import {AIcon} from "../../components/elements/AIcon";
import {AFloatLeft, AFloatRight} from "../../components/AFloat";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ABR} from "../../components/elements/ABR";
import user from "./user";
import {debounce} from 'debounce';
import {AMessage} from "../../components/elements/AMessage";

interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
};

interface IState {
    username : string
    email : string
    password : string
    confirmPassword : string
    registerBtnText: string
    registerBtnState : string
    registerBtnType : string
    usrIsTaken : string
    emailIsTaken : string
    WarningNote : any
    isPasswordsMatched : string
    bIsRegistering : boolean
    bIsWarnedRegions : boolean
    continent : string
    country : string
    _state : string
    bNotValidSignUp : boolean
    isNotValid : [object]
    step : number
    globe : string
    usrLength : number
    usrUrlSafe : boolean
    usrSpaceWarn : boolean
    bPassLength  : boolean
    bPassLow : boolean
    bPassUp : boolean
    bPassSpecial : boolean
    bPassNumbers : boolean
    bHasStates : boolean
};

export const  getStaticProps = async ({locale}) =>{
    try{
        return{
            props:{
                ...(await serverSideTranslations(locale, ['common','register','Lang','warnings','privacy'])),
            }
        }
    }catch (e) {

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

class SignUpPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);

        this.state = {
          username: '',
          email : '',
          password : '',
          confirmPassword: '',
            registerBtnText: 'register:register',
            registerBtnType:'is-primary',
            WarningNote : null,
            bIsRegistering : false,
            bIsWarnedRegions: false,
            isPasswordsMatched : 'empty',
            registerBtnState:'',
            continent:'',
            country:'',
            _state:'',
            emailIsTaken:'',
            usrIsTaken:'',
            usrLength: 0,
            usrUrlSafe : false,
            usrSpaceWarn : false,
            bNotValidSignUp:true,
            bPassLength:false,
            bPassLow:false,
            bPassSpecial:false,
            bPassUp:false,
            bPassNumbers:false,
            // @ts-ignore
            isNotValid:[
                {
                    type:'username',
                    notValid:true
                },
                {
                    type:'pass',
                    notValid:true
                },
                {
                    type:'email',
                    notValid:true
                },
                {
                    type:'continent',
                    notValid:true
                },
                {
                    type:'country',
                    notValid:true
                }
            ],
            step:1,
            globe: 'globe-americas',
            bHasStates : false
        };
    }

    checkPasswords(){
        const {password , confirmPassword,bPassUp,bPassSpecial,bPassLow,bPassLength,bPassNumbers} = this.state;
        const azLow = /[a-z]/g;
        const azUp = /[A-Z]/g;
        const digits = /[\d]/g;
        const spChara = /[!@#$%^&*]/g;

        this.setState({bPassLength : password.length >= 8,bPassNumbers : digits.test(password),
            bPassSpecial: spChara.test(password),
            bPassUp : azUp.test(password), bPassLow : azLow.test(password)});

        if (password === '' && confirmPassword === '') {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }

        if (password !== '' && confirmPassword === '') {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }else if(password === '' && confirmPassword !== '')
        {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }
        if (password !== confirmPassword){
            this.setState({isPasswordsMatched:'mismatch'});

            return;;
        }
        if (password === confirmPassword){
            this.setState({isPasswordsMatched:'match'});
            return;
        }
    }

    handleValidSignUp(type : string){
        setTimeout(() => {
            let bool = true;
            let b = true;
            const {isPasswordsMatched,continent,country,username,email,isNotValid} = this.state;
            // @ts-ignore
            const index = isNotValid.findIndex(i => i.type === type );
            if (index === -1)
                return;

            switch(type){
                case 'username':
                    username != '' ? b = false : b = true;
                    break;
                case 'email':
                    const ERegex = /\A[^@]+@[^@]+\z/;
                    ERegex.test(email) ? b = false : b = true;
                    break;
                case 'pass':
                    isPasswordsMatched === 'match' ? b  = false : b = true;
                    break;
                case 'continent':
                    continent !== '' ? b = false : b = true;
                    break;
                case 'country':
                    country !== '' ? b = false : b = true;
                    break;
            }

            // @ts-ignore
            isNotValid[index].notValid = b;
            isNotValid.map((_b,i) => {
                // @ts-ignore
                bool = _b.notValid;


            });
            // @ts-ignore

                this.setState({bNotValidSignUp:bool,isNotValid});

        },250);

    }

    handleRegistering(){
        const {username,password,email,continent,country,_state,isPasswordsMatched} = this.state;
        const  user = {username,password,email,region:{continent,country,_state}};
        if (isPasswordsMatched === 'match'){
            this.setState({registerBtnState:'is-loading'},() => {
                axNoAuth.post('/register',user).then((done) => {
                    if(done){
                        this.setState({registerBtnText:'register:registered',registerBtnState:'',step:5});
                        setTimeout(() => router.push('/auth/login'),6000);
                    }
                }).catch((err) => {
                    if (err){
                        //display  warning and stop laoding state
                        const e = HandleError(err);
                        if (e.bIsSuccess){
                            this.setState({WarningNote:<ANotification t={this.props.t} color={'is-danger'} message={e.res.warning} onClose={() =>{
                                    this.setState({WarningNote:null});
                                }}/>});
                        }
                        this.setState({registerBtnState:'',registerBtnType:'is-danger',bIsRegistering:false});
                    }
                });
            });
        }


    }

    handleGoBack(){
        const {step} = this.state;
        if (step !== 1){
            this.setState({step:step -1});
        }
    }

    handleGoNext(){
        const {step,username,email,continent,country,isPasswordsMatched,bPassNumbers,
            bPassLength,bPassLow,bPassUp,bPassSpecial,usrUrlSafe,bIsWarnedRegions,bHasStates} = this.state;
        let s = step;
        switch(step){
            case 1:
                const ERegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

           if ((username !== '') && (username.length <= 17) && (usrUrlSafe !== false) && (email !== '' && ERegex.test(email))){
               s +=1;
           }
                break;
            case 2:
                if ((isPasswordsMatched === 'match') && (bPassSpecial) && (bPassNumbers) && (bPassLow) && (bPassUp)){
                    s +=1;
                }
                break;
            case 3:
                if ((continent !== '') && (country !== '')){
                    s +=1;
                }else{
                    this.setState({bIsWarnedRegions:true});
                }
                break;
            case 4 :
                break;
            case 5:
                break;
        }
        if (step !== s)
            this.setState({step:s});
    }

    render()

    {
        const ERegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const {t,bIsAuth} = this.props;
        const {username,email,password,confirmPassword,isPasswordsMatched,country,continent,_state,
            registerBtnType,WarningNote,bNotValidSignUp,step,globe,emailIsTaken,usrIsTaken,usrLength,usrUrlSafe,bIsWarnedRegions,
            usrSpaceWarn,bPassLength,bPassLow,bPassSpecial,bPassUp,bPassNumbers
        } = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('register:register-w-bfs')} ~`,
                        description:''
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <AMobileOnly>
                    <ABR h={70}/>
                </AMobileOnly>
                <ATabletOnly>
                    <ABR h={240}/>
                </ATabletOnly>
                <AHeading size={'1'}>
                    {t('register:register-w-bfs')}
                </AHeading>
                <br/>

                {
                    //@ts-ignore
                    <ABreadCrumbs t={t} crumbs={[{icon:'user-plus',display:'common:links.signup',url:'/auth/sign-up'}]} onCrumbed={() => {}}/>
                }
                <ADesktopOnly>
                    <ul style={{marginLeft:'115px'}}
                        className={'steps is-horizontal is-narrow is-centered '}>
                        <li
                            style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 1 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'user'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 2 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'lock'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 3 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={globe}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 4 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'user-secret'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 5 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'check'}/></span>
                        </li>
                    </ul>
                </ADesktopOnly>
                <ATabletOnly>
                    <ul style={{marginLeft:'115px'}}
                        className={'steps is-horizontal is-narrow is-centered '}>
                        <li
                            style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 1 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'user'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 2 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'lock'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 3 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={globe}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 4 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'user-secret'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 5 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'check'}/></span>
                        </li>
                    </ul>
                </ATabletOnly>
                <AMobileOnly>
                    <ul style={{marginLeft:'35px'}}
                        className={'steps is-horizontal is-narrow is-centered '}>
                        <li
                            style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 1 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'user'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 2 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'lock'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 3 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={globe}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 4 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'user-secret'}/></span>
                        </li>
                        <li style={{minWidth: window ? window.innerWidth <= 699 ? '5em' : '10em' : '10em'}}
                            className={`steps-segment ${step === 5 ? 'is-active' : ''}`}>
                            <span className={'steps-marker'}><AIcon icon={'check'}/></span>
                        </li>
                    </ul>
                </AMobileOnly>
                <br/>
                <ABox
                style={{marginLeft:'50px',marginRight:'50px'}}
                >
                    {
                        step === 1 && <section>
                            <AInputForm inputType={'text'} inputValue={username}
                                        t={t}
                                        leftIcon={'user'}
                                        isColor={usrIsTaken}
                                        label={'common:username'}
                                        onValue={(v) => {
                                            this.setState({username:v,usrLength : v.length},() => {
                                                this.handleValidSignUp('username');
                                                const URL_SAFE = /[!@#$%^&*(),.?":{}|<>]/g;
                                                const SPACE_SAFE = /^.+\s.+$/g;
                                                this.setState({usrUrlSafe:!URL_SAFE.test(v),usrSpaceWarn:SPACE_SAFE.test(v)});
                                                setTimeout(() => {
                                                axNoAuth(`/check-taken?username=${v}`).then((done) => {
                                                    if (done){
                                                        const bool = done.data.bool;
                                                        let s = bool ? 'is-danger' : 'is-success';
                                                        console.log('space = ',SPACE_SAFE.test(v));
                                                        this.setState({usrIsTaken:s});
                                                    }
                                                }).catch((err) => {
                                                    LOG_ERROR(err);
                                                });
                                                },1700);
                                            });
                                        }}/>
                            {
                                usrLength > 17 && <section>
                                    <AMessage t={t}
                                              opt={'is-danger'}
                                              msg={'register:user-length'}/>
                                              <ABR h={1}/>
                                </section>
                            }
                            {
                                username !== '' &&
                                usrSpaceWarn && <section>
                                    <AMessage t={t}
                                              opt={'is-danger'}
                                              msg={'register:username-space-safe'}/>
                                    <ABR h={1}/>
                                </section>
                            }
                            {
                                username !== '' &&
                                usrUrlSafe !== true && <section>
                                    <AMessage t={t}
                                              opt={'is-danger'}
                                              msg={'register:username-url-safe'}/>
                                    <ABR h={1}/>
                                </section>
                            }
                            {
                                usrIsTaken !== '' && <section>
                                    <AMessage t={t}
                                              opt={usrIsTaken}
                                              msg={usrIsTaken === 'is-danger' ?  'register:user-taken' : 'register:user-free'}/>
                                </section>
                            }
                            <AInputForm inputType={'email'} inputValue={email}
                                        t={t}
                                        leftIcon={'envelope'}
                                        isColor={emailIsTaken}
                                        label={'common:email'}
                                        onValue={(v) => {
                                            this.setState({email:v},() => {
                                                this.handleValidSignUp('email');

                                            });
                                        }}/>
                            {
                                email !== '' &&
                                ERegex.test(email) !== true && <section>
                                    <AMessage t={t} opt={'is-danger'}
                                              msg={'register:email-warn'}/>
                                </section>
                            }

                        </section>
                    }
                    {
                        step === 2 && <section>
                            <AInputForm inputType={'password'} inputValue={password}
                                        t={t}
                                        leftIcon={'lock'}
                                        isColor={isPasswordsMatched === 'match' ? 'is-success': isPasswordsMatched === 'empty' ? '' : 'is-danger'}
                                        label={'common:password'}
                                        onValue={(v) => {
                                            this.setState({password:v},() =>{
                                                this.checkPasswords();
                                                this.handleValidSignUp('pass');
                                            });

                                        }}/>
                            <AInputForm inputType={'password'} inputValue={confirmPassword}
                                        t={t}
                                        leftIcon={'lock'}
                                        label={'register:confirm-password'}
                                        isColor={isPasswordsMatched === 'match' ? 'is-success': isPasswordsMatched === 'empty' ? '' : 'is-danger'}
                                        onValue={(v) => {
                                            this.setState({confirmPassword:v},() => {
                                                this.checkPasswords();
                                                this.handleValidSignUp('pass');
                                            });

                                        }}/>
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
                        </section>
                    }
                    {
                        step === 3 && <section>
                            <ALabel>
                                {t('register:your-region')}
                            </ALabel>
                            <AContinentDropDown t={t} onSelected={(value) => {
                                let s = 'globe';
                                switch(value){
                                    case 'C-EU':
                                        s = 'globe-europe';
                                        break;
                                    case 'C-NA':
                                    case 'C-SA':
                                        s = 'globe-americas';
                                        break;
                                    case 'C-AF':
                                        s = 'globe-africa';
                                        break;
                                    case 'C-AS':
                                    case 'C-OC':
                                        s = 'globe-asia';
                                        break;
                                    default:
                                        break;
                                }
                                this.setState({continent:value,_state:'',country:'',globe:s},() => this.handleValidSignUp('continent'));

                            }}/>
                            <br/>
                            {
                                //@ts-ignore
                                <ACountryDropDown t={t} code={continent} onSelected={(value) => this.setState({country:value,_state:''},() => this.handleValidSignUp('country'))}/>
                            }
                            <br/>
                            {
                                //@ts-ignore
                                <AStateDropDown t={t} code={country}
                                                bIsEmpty={(bool) => {
                                                    if (this.state.bHasStates !== bool)
                                                        this.setState({bHasStates:bool});
                                                }}
                                                onSelected={(value) => this.setState({_state:value},() => this.handleValidSignUp())}/>
                            }
                            {
                                bIsWarnedRegions &&
                                    <span>
                                        <br/>
                                        <ABR h={15}/>
                                         <AMessage t={t} opt={'is-danger'} msg={'register:regions-warn'}/>
                                    </span>

                            }

                        </section>
                    }
                    {
                        step === 4 && <section>
                            <AHeading size={'3'}>
                                {t('common:links.privacy-policy')}
                            </AHeading>
                            <APrivacyStatement t={t} bScroll={true}/>
                            <AHelp t={t} status={'is-danger'} msg={'register:by-agree'}/>
                            <br/>
                            <AHelp t={t} status={'is-success'} msg={'register:newsletter-warn'}/>
                            <br/>
                        </section>
                    }
                    {
                        step === 5 && <section>
                            <span style={{
                                textAlign:'center',
                                fontSize:'18px'
                            }}>
                                <p>{t('register:thank-you')}</p>
                            </span>
                        </section>
                    }


                    {WarningNote !== null && WarningNote}
                    <br/>
                    <AFloatLeft>
                        {
                            step !== 5 &&
                            <AButton t={t} btnText={'common:prev'} btnType={'is-info'}
                                     disabled={step === 1}
                                     onClicked={() => {
                                         this.handleGoBack();
                                     }}/>
                        }

                    </AFloatLeft>
                    {
                        step !== 5 &&
                            step !== 4 &&
                        <AFloatRight>
                            <AButton t={t}
                                     disabled={step === 4}
                                     btnText={'common:next'} btnType={'is-primary'} onClicked={() => {
                                this.handleGoNext();
                            }}/>
                        </AFloatRight>
                    }
                    {
                        step === 4 &&
                            <AFloatRight>
                                <AButton t={t}
                                         disabled={bNotValidSignUp}
                                         btnText={this.state.registerBtnText} btnType={registerBtnType}
                                         btnState={this.state.registerBtnState}
                                         onClicked={() => {
                                             if (!this.state.bIsRegistering)
                                             {
                                                 this.handleRegistering();
                                             }
                                             this.setState({bIsRegistering:true});
                                         }}/>
                            </AFloatRight>

                     }

                    <br/>
                </ABox>

            </Layout>
        )
    }
}

const TS =  withTranslation(['common','register','Lang','warnings','privacy']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(SignUpPage);