// @ts-nocheck
import React, {Component} from "react";
import Layout from "../../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AHeading from "../../components/AHeading";
import ABox from "../../components/elements/ABox";
import AInputForm from "../../components/form/AInputForm";
import {compose} from "redux";
import {connect} from "react-redux";
import {setAuth, setUsr} from "../../store/action";
import AButton from "../../components/elements/AButton";
import {axAuth, axNoAuth, IsAuth} from "../../utils/axios";
import Cookies from 'js-cookie'
import {HandleError} from "../../lib/Utils";
import {ANotification} from "../../components/elements/ANotification";
import {AFloatLeft, AFloatRight} from "../../components/AFloat";
import {LOG_ERROR} from "../../utils/logs";
import router from 'next/router';
import LogRocket from "logrocket";
import {ABreadCrumbs} from "../../components/elements/ABreadcrumbs";
import {ABR} from "../../components/elements/ABR";
import {AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ATAbs} from "../../components/ui/ATabs";


interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean

}

interface IState {
    username : string
    password : string
    loginState :  string
    loginType : string
    forgotState : string
    forgotType : string
    userForgotState : string
    userForgotType : string
    warningNote : any
    email : string
    emailUser :string
    bForgot : boolean
    forgotTabIndex: number
}



export const  getStaticProps = async ({locale,context}) =>{
    try{

        return{
            props:{
                ...(await serverSideTranslations(locale, ['common','forgot','login','warnings','warnings-2','Lang'])),

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

class LoginPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : '',
            loginState : '',
            loginType : 'is-primary',
            forgotState : '',
            forgotType : 'is-primary',
            userForgotType: 'is-primary',
            userForgotState: '',
            warningNote : null,
            email: '',
            emailUser: '',
            bForgot : false,
            forgotTabIndex:0
        }
    }

    componentDidMount() {

    }

    handleForgotPass(){
        const {email} = this.state;
        const body = {
            email
        };
        this.setState({forgotState:'is-loading'},() => {
            axNoAuth.post('/reset-verify-email',body).then((done) => {
                if (done){
                    this.setState({forgotType:'is-success',forgotState:'',
                        warningNote:<ANotification t={this.props.t} color={'is-success'} message={done.data.message} onClose={() =>{
                            this.setState({warningNote:null});
                        }}/>
                    });
                }
            }).catch((err) => {
                LOG_ERROR(err);
                const e = HandleError(err);
                if (e.bIsSuccess){
                    this.setState({warningNote:<ANotification t={this.props.t} color={'is-danger'} message={e.res.warning} onClose={() =>{
                            this.setState({warningNote:null});
                        }}/>});
                }
                this.setState({forgotState:'',forgotType:'is-danger'});
            });
        });
    }

    handleForgotUsername(){
        const {emailUser} = this.state;

        this.setState({userForgotState:'is-loading'},() => {
            axNoAuth.post('/resend-username?email=' + emailUser).then((done) => {
                if (done){
                    this.setState({userForgotType:'is-success',userForgotState:'',
                        warningNote:<ANotification t={this.props.t} color={'is-success'} message={done.data.message} onClose={() =>{
                            this.setState({warningNote:null});
                        }}/>
                    });
                }
            }).catch((err) => {
                LOG_ERROR(err);
                const e = HandleError(err);
                if (e.bIsSuccess){
                    this.setState({warningNote:<ANotification t={this.props.t} color={'is-danger'} message={e.res.warning} onClose={() =>{
                            this.setState({warningNote:null});
                        }}/>});
                }
                this.setState({userForgotState:'',userForgotType:'is-danger'});
            });
        });
    }

    handleLogin(){
        const {username , password } = this.state;
        const body = {username,password};

        this.setState({loginState:'is-loading'}, () => {
          axNoAuth.post('/auth',body).then((done) => {
              if(done){
                  Cookies.set('token',done.data.token,{expires : 7,sameSite: 'Strict'});
                  // @ts-ignore
                  this.props.setAuth(true);
                  // @ts-ignore
                  this.props.setUsr(done.data.usr);
                  this.setState({loginState:'',loginType:'is-success'});
                  const _Date = new Date();
                  Cookies.set('lastUpdate',_Date);
                  if (process.env.NODE_ENV === 'production'){
                      /// DEV MODE
                      const bDev = false;

                      LogRocket.init(bDev ? 'gene-panel/bfs_dev' : 'fsspsc/bfs');
                  }
                  if (process.env.NODE_ENV === 'production'){
                      // @ts-ignore
                      LogRocket.identify(`${done.data.usr._id}`,{
                          // @ts-ignore
                          name:done.data.usr.username,
                          // @ts-ignore
                          email:done.data.usr.email
                      });
                  }
                  router.push('/');
              }
          }).catch((err) =>{
             const e = HandleError(err);
             if (e.bIsSuccess){
                this.setState({warningNote:<ANotification t={this.props.t} color={'is-danger'} message={e.res.warning} onClose={() =>{
                        this.setState({warningNote:null});
                    }}/>});
             }
             this.setState({loginState:'',loginType:'is-danger'});
          })
        });
    }

    render(){
        const {t,bIsAuth} = this.props;
        const {username , password , email ,loginType, loginState,forgotState,forgotType, bForgot,forgotTabIndex,
            emailUser,userForgotState,userForgotType} = this.state;
        return(
            //@ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.login')} ~`,
                        description:''
                    }}
                    AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}} bIsAuth={bIsAuth}>
                {
                    bForgot &&
                        <section>
                            <AMobileOnly>
                                <br/><br/>  <br/><br/>
                            </AMobileOnly>
                            <ATabletOnly>
                                <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                            </ATabletOnly>
                            <AHeading size={'1'}>
                                {t('forgot:forgot')}
                            </AHeading>
                            <br/>
                            {
                                //@ts-ignore
                                <ABreadCrumbs t={t} crumbs={[{icon:'sign-in-alt',display:'common:links.login',url:'/auth/login'}]} onCrumbed={() => {}}/>
                            }
                            <ABox>
                                <ATAbs t={t} opts={'is-centered'}
                                       tabs={[{icon:'user',ts:'forgot:forgot-username'},
                                           {icon:'user-lock',ts:'forgot:forgot-password'}]} onTabSel={(t) => {
                                    this.setState({forgotTabIndex:t});
                                }}/>
                                {
                                    forgotTabIndex === 0 &&
                                        <section>
                                            <AInputForm t={t} label={'common:email'} inputType={'email'}
                                                        inputValue={emailUser} onValue={(v) => this.setState({emailUser:v})}/>
                                            {this.state.warningNote !== null && this.state.warningNote}
                                            {this.state.warningNote !== null && <br/>}
                                            <AFloatLeft>
                                                <AButton t={t} btnText={'common:back'} btnIcon={'undo'} btnType={'is-info'} onClicked={() => this.setState({bForgot:false})}/>
                                            </AFloatLeft>
                                            <AFloatRight>
                                                <AButton t={t} btnText={'forgot:forgot-username'}
                                                         btnIcon={'user'} btnState={userForgotState} btnType={userForgotType}
                                                         onClicked={() => {
                                                             if (userForgotType !== 'is-loading'){
                                                                this.handleForgotUsername();
                                                             }

                                                         }}/>
                                            </AFloatRight>
                                            <br/>
                                        </section>
                                }
                                {
                                    forgotTabIndex === 1 &&
                                    <section>
                                        <AInputForm t={t} label={'common:email'} inputType={'email'}
                                                    inputValue={email} onValue={(v) => this.setState({email:v})}/>
                                        {this.state.warningNote !== null && this.state.warningNote}
                                        {this.state.warningNote !== null && <br/>}
                                        <AFloatLeft>
                                            <AButton t={t} btnText={'common:back'} btnIcon={'undo'} btnType={'is-info'} onClicked={() => this.setState({bForgot:false})}/>
                                        </AFloatLeft>
                                        <AFloatRight>
                                            <AButton t={t} btnText={'login:forgot-pass'} btnIcon={'key'}
                                                     btnState={forgotState} btnType={forgotType}
                                                     onClicked={() => {
                                                         if (userForgotState !== 'is-loading'){
                                                             this.handleForgotPass();
                                                         }

                                                     }}/>
                                        </AFloatRight>
                                        <br/>
                                    </section>
                                }

                            </ABox>

                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </section>
                }
                {
                    !bForgot &&
                        <section>
                            <AMobileOnly>
                                <br/><br/>  <br/><br/>
                            </AMobileOnly>
                            <ATabletOnly>
                                <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                            </ATabletOnly>
                            <AHeading size={'1'}>
                                {t('common:links.login')}
                            </AHeading>
                            <br/>
                            {
                                //@ts-ignore
                                <ABreadCrumbs t={t} crumbs={[{icon:'sign-in-alt',display:'common:links.login',url:'/auth/login'}]} onCrumbed={() => {}}/>
                            }
                            <ABox>
                                <AInputForm inputType={'text'} inputValue={username}
                                            t={t}
                                            label={'common:username'}
                                            onValue={(v) => {
                                                this.setState({username:v});
                                            }}/>

                                <AInputForm inputType={'password'} inputValue={password}
                                            t={t}

                                            label={'common:password'}
                                            onValue={(v) => {
                                                this.setState({password:v},() =>{

                                                });

                                            }}/>
                                {this.state.warningNote !== null && this.state.warningNote}
                                {this.state.warningNote !== null && <br/>}
                                <AFloatLeft>
                                    <AButton t={t}
                                             btnText={'forgot:forgot'} btnType={'is-info'}
                                             btnIcon={'question'}

                                             onClicked={() => {
                                                this.setState({bForgot:true});
                                             }}/>
                                </AFloatLeft>
                                <AFloatRight>
                                    <AButton t={t} btnText={'common:links:login'} btnType={loginType} btnIcon={'sign-in-alt'} btnState={loginState} onClicked={() => {
                                        if (loginState !== 'is-loading'){
                                            this.handleLogin();
                                        }
                                    }}
                                    />
                                </AFloatRight>

                                <br/>
                            </ABox>
                            <br/><br/><br/><br/>
                        </section>
                }

            </Layout>
        )
    }
}

const TS = withTranslation(['common','login','warnings','warnings-2','Lang','forgot']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(LoginPage);