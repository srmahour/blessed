import {Component} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Layout from "../../components/Layout";
import {withTranslation} from "next-i18next";
import ABox from "../../components/elements/ABox";
import {axNoAuth} from "../../utils/axios";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../../store/action";
import router from 'next/router';
import {LOG_ERROR} from "../../utils/logs";
import {GetServerSideProps} from "next";
import Cookie from 'js-cookie';
import LogRocket from "logrocket";

interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
    _u : any
    bAuth : boolean
    updated : string
    bIgnoreAuth: boolean
};

interface IState {
    
};

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    try {
        let bAuth = false;
        let bIgnoreAuth = true;
        let updated = '';
        let _u = false;
        if ((ctx.req) && (ctx.req.cookies)){
            if (ctx.req.cookies.token){
                const token = ctx.req.cookies.token;
                const done = await axNoAuth.get('/verify-auth',{headers:{'authorization' : token}});
                bAuth = true;
                bIgnoreAuth = false;
                updated = done.data.token;
                _u = done.data.usr;
            }
        }
        if (ctx.query.refer){
            return {
                props:{
                    ...(await serverSideTranslations(ctx.locale,['common','Lang'])),
                    bAuth,
                    bIgnoreAuth,
                    updated,
                    _u,
                    query:ctx.query
                }
            }
        }else{
            return {
                props:{
                    ...(await serverSideTranslations(ctx.locale,['common','Lang'])),
                    bAuth,
                    bIgnoreAuth,
                    updated,
                    _u,

                }
            }
        }


    }catch (e) {
       // LOG_ERROR(e);
        return {
            props:{
                ...(await serverSideTranslations(ctx.locale,['common','Lang'])),
                bAuth:false,
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

class AuthUser extends Component<IProps, IState>{

    constructor(props) {
        super(props);

        this.state = {
           
        };
    }

  
    componentDidMount() {
        if (process.env.NODE_ENV === 'production'){
            LogRocket.init('fsspsc/bfs');
        }
        const {_u,updated,bAuth,bIgnoreAuth} = this.props;
        console.log(this.props);
        if (bIgnoreAuth){
            // @ts-ignore
            this.props.setAuth(false);
            // @ts-ignore
            this.props.setUsr({});
            router.push('/');
        }else{
            if (bAuth){
                // @ts-ignore
                this.props.setAuth(true);
                // @ts-ignore
                this.props.setUsr(_u);
                Cookie.remove('token');
                Cookie.set('token',updated,{expires : 1,sameSite: 'Strict',secure:true});
                const _Date = new Date();
                Cookie.remove('lastUpdate');
                Cookie.set('lastUpdate', _Date);

                if (process.env.NODE_ENV === 'production'){
                    // @ts-ignore
                    LogRocket.identify(`${_u._id}`,{
                        // @ts-ignore
                        name:_u.username,
                        // @ts-ignore
                        email:_u.email
                    });
                }
                setTimeout(() => {
                    // @ts-ignore
                    if ((this.props.query) && (this.props.query.refer)){
                        // @ts-ignore
                        router.push(this.props.query.refer);
                    }
                    else
                        router.push('/');
                },600);
            }
            else{

                // @ts-ignore
                this.props.setAuth(false);
                // @ts-ignore
                this.props.setUsr({});
                router.push('/');
            }
        }
    }


    render()

    {
        const {t,bIsAuth} = this.props;
        const {} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}  bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
              <br/>
              <ABox>
                  <p style={{textAlign:'center'}}>
                  {t('common:re-auth-msg')}
                  </p>
              </ABox>
                <br/>
            </Layout>
        )
    }
}

const TS =  withTranslation(['common','register','Lang','warnings']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(AuthUser);