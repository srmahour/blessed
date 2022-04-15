// @ts-nocheck
import React, {Component} from "react";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { withTranslation} from "react-i18next";
import Layout from "../../components/Layout";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../../store/action";
import {AMyQuestionsView} from "../../components/views/AMyQuestionsView";
import AHeading from "../../components/AHeading";
import {AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ABR} from "../../components/elements/ABR";
import {ABreadCrumbs} from "../../components/elements/ABreadcrumbs";



interface  IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
};

interface  IState {
    page : number
    limit : number
}

// @ts-ignore
export const getServerSideProps : GetServerSideProps = async (ctx) => {
    try {

        return {
            props:{
                ...(await serverSideTranslations(ctx.locale,['common','Lang','my-questions','warnings'])),
            }
        }
    }catch (e) {

        return {
            props:{
                ...(await serverSideTranslations(ctx.locale,['common','Lang','my-questions','warnings'])),
            }
        }
    }
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

class QuestionsPage extends Component<IProps , IState>{
    constructor(props) {
        super(props);

        this.state = {
            page : 1,
            limit : 10,
        } ;

    }

    componentDidMount() {

    }


    render()
    {

        const {t,bIsAuth} = this.props;
        const {page,limit} = this.state;

        return(
            // @ts-ignore
            <Layout t={t}  bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <br/>
                <AMobileOnly>
                    <ABR h={55}/>
                </AMobileOnly>
                <ATabletOnly>
                    <ABR h={85}/>
                </ATabletOnly>
                {
                    //@ts-ignore
                    <ABreadCrumbs t={t}  opts={'is-centered'}
                                  crumbs={[{display:'common:links.questions',icon:'question',url:'/auth/my-questions'}]} onCrumbed={(c) => {

                    }}/>
                }
                <div className={'container'}>
                    <div className={'content'}>

                        <AHeading size={'1'}>
                            {t('my-questions:all')}
                        </AHeading>


                        {
                            //@ts-ignore &&
                            <AMyQuestionsView t={t} limit={limit} page={page} onClickPage={(p) => this.setState({page:p})} />
                        }


                    </div>
                </div>
            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang','my-questions','warnings']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(QuestionsPage);