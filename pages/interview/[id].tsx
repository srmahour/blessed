//@ts-nocheck
import {Component} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Layout from "../../components/Layout";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {GetServerSideProps} from "next";
import AHeading from "../../components/AHeading";
import { axNoAuth} from "../../utils/axios";
import {setAuth, setUsr} from "../../store/action";
import moment from 'moment';

import {AGrpTag} from "../../components/elements/ATag";

import {ABreadCrumbs} from "../../components/elements/ABreadcrumbs";
import {ADesktopOnly, AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ABR} from "../../components/elements/ABR";
import interviews from "../interviews";
import {getIFrameByPlatform} from "../../components/views/AInterviewCarouselView";



interface IProps {
    t(ts : string) : string
    bIsAuth : boolean
    params : object
    id : string
    interview:object

}

interface IState {

    crumbs : [object]
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
        setAuth: (bool) => {dispatch(setAuth(bool))},
        setUsr:  (obj) => {dispatch(setUsr(obj))},
    }
}


// @ts-ignore
export const getServerSideProps : GetServerSideProps = async (ctx) => {
    try {
        const InterviewRes = await axNoAuth.get(`/interview?id=${ctx.params.id}`);

        return {
            props:{
                ...(await serverSideTranslations(ctx.locale,['common','Lang','interviews'])),
                // @ts-ignore
                params : ctx.params,
                id : ctx.params.id,
                interview:InterviewRes.data

            }
        }
    }catch (e) {
        return {
            props:{

            }
        }
    }
};

class InterviewPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);

        this.state = {

            crumbs:[{display:'common:links.past-interviews',icon:'microphone-stand',url:'/interviews'},
                {display:'microphone-stand',icon:'microphone',url:'/'}]
        }
    }

    componentDidMount() {
        const {crumbs} = this.state;
        crumbs[1].display = this.props.interview.title;
        crumbs[1].url = `/interview/${this.props.interview._id}`;
        this.setState({crumbs:crumbs});
    }



    render(){
        const {t,bIsAuth,interview} = this.props;
        const {crumbs} = this.state;
        if (!interview){
            return(
                <Layout t={t}>
                   Loading
                </Layout>
            )
        }
        else if (interview)
            return(
                <Layout t={t}
                        metadata={{
                            title:`Blessed for Service ~ ${interview.title} ~`,
                            description:''
                        }}
                        AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}} bIsAuth={bIsAuth} >
                    <div >


                        <div className={''}>
                            <AMobileOnly>
                                <ABR h={'45'}/>
                            </AMobileOnly>
                            <ATabletOnly>
                                <ABR h={'85'}/>
                            </ATabletOnly>

                            <br/>
                            <ABreadCrumbs t={t}
                                          opts={'is-centered'}
                                          crumbs={crumbs} onCrumbed={(c) => {

                            }}
                            />
                            <div
                                style={{marginLeft:'20px',marginRight:'20px'}}
                                className={' box'}>
                                <AHeading size={'1'}>
                                    {interview.title}
                                </AHeading>
                                <ABR h={15}/>
                                <AGrpTag  leftTag={'Date'}  tag={moment(interview.date).format("MMM Do YYYY")} color={'is-primary'}/>
                                <AMobileOnly>
                                    {getIFrameByPlatform(//@ts-ignore
                                        interview.type,interview.url,'100%','360px')}
                                </AMobileOnly>
                                <ATabletOnly>
                                    {getIFrameByPlatform(//@ts-ignore
                                        interview.type,interview.url,'100%','720px')}
                                </ATabletOnly>
                                <ADesktopOnly>
                                    {getIFrameByPlatform(//@ts-ignore
                                        interview.type,interview.url,'100%','720px')}
                                </ADesktopOnly>



                            </div>


                        </div>
                    </div>
                </Layout>
            )
        else return <div>Loading Error</div>
    }
}

const REDUX = connect(mapStateToProps,mapDispatchToProps);
const I18N = withTranslation(['common','Lang','interviews']);

export default compose(REDUX,I18N)(InterviewPage);