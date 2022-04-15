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
import {ARichEditor} from "../../components/elements/ARichEditor";
import {AFloatRight} from "../../components/AFloat";
import AButton from "../../components/elements/AButton";
import {AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ABR} from "../../components/elements/ABR";
import ALabel from "../../components/form/ALabel";
import {ADropDown} from "../../components/elements/ADropDown";




interface  IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
};

interface  IState {

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

        } ;

    }


    componentDidMount() {

    }

    render()
    {

        const {t,bIsAuth} = this.props;
        const {} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.fair-use-notice')} ~`,
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
                            {t('common:links.fair-use-notice')}
                        </AHeading>
                        <br/>
                        <ABox>

                         <section>
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