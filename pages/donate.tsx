// @ts-nocheck
import React, {Component} from "react";
import Layout from "../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../store/action";
import ABox from "../components/elements/ABox";
import AHeading from "../components/AHeading";
import {CheckAuth} from "../lib/Auth";
import AButton from "../components/elements/AButton";
import {AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABR} from "../components/elements/ABR";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";

interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
}

interface IState {

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
                ...(await serverSideTranslations(locale, ['common','Lang','donate'])),
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


class DonatePage extends Component<IProps, IState>{

    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    render(){
        const {t,bIsAuth} = this.props;

        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.donate')} ~`,
                        keywords:['Blessed for Service','Signup and Membership is Free','service','humanity','One True Living God',
                        'Great Awakening','Donations'
                        ],
                        description:'Blessed for Service is dedicated and in service to humanity and the One True Living God during this time of Great Awakening. Donations are appreciated and it makes it possible to continue their work.\nBlessed for Service website Signup and Membership is Free.'
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
              <span className={'container'}>
                <AMobileOnly>
                    <br/><br/>  <br/><br/>
                </AMobileOnly>
                <ATabletOnly>
                    <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                </ATabletOnly>
                  <AHeading size={'1'}>
                   {t('donate:donate')}
               </AHeading>
                <br/>
                  {
                      //@ts-ignore
                      <ABreadCrumbs t={t} crumbs={[{icon:'donate',display:'common:links.donate',url:'/donate'}]} onCrumbed={() => {}}/>
                  }
                <ABox
                style={{backgroundImage:"url('/imgs/sunburst.png')",
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat',
                        opacity:'0.5',
                        flexShrink:'0'

                }

                }
                >
                    <span style={{opacity:'1'}}>
                          <p  className={'txt-outline'}
                              style={{color:'goldenrod',fontWeight:'bolder',fontSize:'18px'}}>
                              {t('donate:blurb')}
                    </p>
                    <br/>
                    <span id={'po-box'} className={'txt-outline'} style={{textAlign:'center'}}>
                        <p  style={{color:'goldenrod',fontWeight:'bolder',fontSize:'18px'}}>Gene Decode</p>
                        <p style={{color:'goldenrod',fontWeight:'bolder',fontSize:'18px'}}>PO Box 441218</p>
                        <p style={{color:'goldenrod',fontWeight:'bolder',fontSize:'18px'}}>Aurora, CO  80044</p>
                    <p  style={{color:'goldenrod',fontWeight:'bolder',fontSize:'18px'}}>{t('donate:check')}</p>
                                 <p  style={{color:'goldenrod',fontWeight:'bolder',fontSize:'18px'}}>{t('donate:ko-fi')}</p>
                    </span>
                    <br/>
                <span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                    <span
                    style={{paddingBottom:'20px'}}
                    >
                        <AButton t={t} btnIcon={'stripe'} btnText={'donate:donate'} btnType={'is-info'} onClicked={() => {
                            window.open('https://buy.stripe.com/6oE16qgGJc6wgjmfYY')
                        }} />
                        &nbsp;
                        <AButton t={t} btnIcon={'kofi'} btnText={'Ko-fi'} style={{backgroundColor:'#ff5f5f'}} btnType={'is-info'} onClicked={() => {
                            window.open('https://ko-fi.com/bfsgenedecode7')
                        }} />
                    </span>
                </span>


                    </span>

             <AMobileOnly>
                   <ABR h={85}/>
                   <br/><br/>
                </AMobileOnly>
               </ABox>

              </span>

            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang','donate']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(DonatePage);