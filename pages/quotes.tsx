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
import {AQuotesView} from "../components/views/AQuotesView";
import {LOG_ERROR} from "../utils/logs";
import {AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABR} from "../components/elements/ABR";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";



interface  IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
    quotes : object
};

interface  IState {
    page : number
    limit : number
}

export const  getServerSideProps = async (ctx) =>{

    try{

        const quotesRes = await  axNoAuth.get('quotes?page=1&limit=3');

        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','quotes'])),
                quotes:quotesRes.data
            }
        }
    }catch (e) {
        LOG_ERROR(e);
        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','quotes'])),
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

class AllQuotesPage extends Component<IProps , IState>{
    constructor(props) {
        super(props);

        this.state = {
            page : 1,
            limit : 10,
        } ;

    }



    render()
    {

        const {t,bIsAuth,quotes} = this.props;
        const {page , limit} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('quotes:gene')} ~`,
                        description:''
                    }}
                    bIsAuth={bIsAuth} AuthRedux={ // @ts-ignore
                        {setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
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
            {t('quotes:gene')}
        </AHeading>
            {
                //@ts-ignore
                <ABreadCrumbs t={t} crumbs={[{icon:'quote-right',display:'quotes:gene',url:'/quotes'}]} onCrumbed={() => {}}/>
            }
        <ABox>
            {//@ts-ignore
                <AQuotesView t={t} page={page} limit={limit} onPage={(p) => this.setState({page:p})}/>
                }


        </ABox>

    </div>
    </div>
    </Layout>
    )
    }
}

const TS = withTranslation(['common','Lang','quotes']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(AllQuotesPage);