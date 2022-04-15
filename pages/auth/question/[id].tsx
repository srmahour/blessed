//@ts-nocheck
import React, {Component} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Layout from "../../../components/Layout";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {compose} from "redux";
import {GetServerSideProps} from "next";
import AHeading from "../../../components/AHeading";
import {axAuth, axNoAuth} from "../../../utils/axios";
import {setAuth, setUsr} from "../../../store/action";
import moment from 'moment';
import xss from 'xss';
import {AGrpTag, ATag} from "../../../components/elements/ATag";
import {GetDisplayContinent, GetDisplayCountry, GetDisplayState} from "../../../utils/regions";
import {ABreadCrumbs} from "../../../components/elements/ABreadcrumbs";
import {AMobileOnly, ATabletOnly} from "../../../components/AHiders";
import {ABR} from "../../../components/elements/ABR";
import {AFloatLeft, AFloatRight} from "../../../components/AFloat";
import AButton from "../../../components/elements/AButton";
import ARichQuillEditor from "../../../components/ui/ARichQuillEditor";



interface IProps {
    t(ts : string) : string
    bIsAuth : boolean
    params : object
    id : string
    question : object
    replies: [object]
}

interface IState {
    response : string
    resState : string
    resType : string
    crumbs : [object]
    replyState : string
    replyType : string
    bIsReplying : boolean
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

        const qRES = await axNoAuth.get('/auth/question?id=' + ctx.params.id,{
            headers:{'authorization' : `${ctx.req.cookies.token}`}
        });

        const qReplyRes = await axNoAuth.get('/auth/question-response?id=' + ctx.params.id,{
            headers:{'authorization' : `${ctx.req.cookies.token}`}
        });

        return {
            props:{
                ...(await serverSideTranslations(ctx.locale,['common','Lang','my-questions'])),
                // @ts-ignore
                params : ctx.params,
                id : ctx.params.id,
                question:qRES.data,
                replies:qReplyRes.data
            }
        }
    }catch (e) {
        return {
            props:{

            }
        }
    }
};

class QuestionIDPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);

        this.state = {
            response:'',
            resState:'',
            resType:'is-primary',
            replyState:'',
            replyType:'is-primary',
            bIsReplying:false,
            crumbs:[{display:'common:links.questions',icon:'question',url:'/auth/my-questions'},{display:'',icon:'question-circle',url:'/'}]
        }
    }

    componentDidMount() {
        const {crumbs} = this.state;
        crumbs[1].display = this.props.question?.subject;
        crumbs[1].url = `/auth/question/${this.props.question?._id}`;
        this.setState({crumbs:crumbs});
    }

    handleReply(r_id,coordinator){
        this.setState({[`r-${r_id}-state`]:'is-loading'},() => {
            const body = {
                q_id:this.props.question._id,
                a_id:r_id,
                msg:this.state[`r-${r_id}`],
                date:new Date(),
                coordinator
            }
            axAuth.post('/auth/usr/reply-to-question',body).then((done) => {
                if (done){
                    this.setState({[`r-${r_id}-type`]:'is-success',[`r-${r_id}-state`]:'',[`r-${r_id}-sent`]:true});
                }
            })
        });
    }


    render(){
        const {t,bIsAuth,question,replies} = this.props;
        const {response,resState,resType,crumbs,replyState,replyType,bIsReplying} = this.state;
        if (!bIsAuth){
            return(
                <Layout t={t}>
                    Not Allowed
                </Layout>
            )
        }
        else if (question)
            return(
                <Layout t={t} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}} bIsAuth={bIsAuth} >
                    <div >


                        <div className={''}>
                            <AMobileOnly>
                                <ABR h={'45'}/>
                            </AMobileOnly>
                            <ATabletOnly>
                                <ABR h={'85'}/>
                            </ATabletOnly>
                            <AHeading size={'1'}>
                                {question.subject}
                            </AHeading>
                            <br/>
                            <ABreadCrumbs t={t}
                                          opts={'is-centered'}
                                          crumbs={crumbs} onCrumbed={(c) => {

                            }}
                            />
                            <div
                                style={{marginLeft:'20px',marginRight:'30px'}}
                                className={' box'}>

                                <article className={'media'}>
                                    <figure className={'media-left'}>
                                        <p className={'image is-64x64'}>
                                            <img src={'/imgs/BFS_Logo_V2.png'}/>
                                            { //@ts-ignore
                                                question.bIsAnon !== true &&  <p style={{textAlign:'center'}}>{question.usr.username}</p> }

                                        </p>
                                    </figure>
                                    <div className={'media-content'}>
                                        <div className={'content'}>
                                            <span style={{display:'inline-flex'}}>
                                                 { //@ts-ignore
                                                     question.continent_code !== undefined &&
                                                     //@ts-ignore
                                                     <AGrpTag t={t} leftTag={'my-questions:continent'} tag={GetDisplayContinent(question.continent_code)} color={'is-primary'}/>
                                                 }
                                                &nbsp;
                                                { //@ts-ignore
                                                    question.country_code !== undefined &&
                                                    //@ts-ignore
                                                    question.country_code !== '' &&
                                                    //@ts-ignore
                                                    <AGrpTag t={t} leftTag={'my-questions:country'} tag={GetDisplayCountry(question.country_code)} color={'is-primary'}/>
                                                }
                                                &nbsp;
                                                { //@ts-ignore
                                                    question.state_code !== undefined &&
                                                    //@ts-ignore
                                                    question.state_code !== '' &&
                                                    //@ts-ignore
                                                    <AGrpTag t={t} leftTag={'my-questions:state'} tag={GetDisplayState(question.country_code,question.state_code)} color={'is-primary'}/>
                                                }
                                            </span>
                                            <br/>
                                            <span style={{display:'inline-flex'}}>
                                                 <AGrpTag t={t} leftTag={'my-questions:asked-on'}  tag={moment(question.date).format("MMM Do YYYY")} color={'is-primary'}/>
                                                &nbsp;
                                                <ATag t={t} tag={
                                                    //@ts-ignore
                                                    question.bIsAnswered ? 'Answered' : 'Not Answered'} color={question.bIsAnswered ? 'is-success': 'is-danger'}/>
                                            </span>

                                            <p dangerouslySetInnerHTML={{__html:xss(question.question)}}/>
                                        </div>
                                    </div>
                                </article>
                                <br/>



                            </div>
                            <br/>
                            <section id={'coord-replies'}>
                                <AHeading size={'3'}>
                                    {t('my-questions:answers')}
                                </AHeading>
                                {replies.map((r,i) => {
                                    return(
                                        <div>
                                            {i !== 0 && <br/>}
                                            <span
                                                style={{
                                                    marginLeft:'30px',
                                                    marginRight:'20px',
                                                    minHeight:'240px'
                                                }}
                                                className={'box'}>
                                                <article className={'media'}>
                                                      <figure className={'media-left'}>
                                        <p className={'image is-64x64'}>
                                            <img src={'/imgs/BFS_MINI_V2.png'}/>
                                            { //@ts-ignore
                                                 <p style={{textAlign:'center'}}>{r._c.username}</p> }

                                        </p>
                                    </figure>
                                    <div className={'media-content'}>
                                        <div className={'content'}>
                                          <AGrpTag t={t} leftTag={'my-questions:answered-on'}  tag={moment(question.date).format("MMM Do YYYY")} color={'is-primary'}/>
                                            {r._c.roles.regions.continents.length >= 1 &&
                                            <span>
                                                <br/>
                                                {
                                                    r._c.roles.regions.continents.map((c,i) => {
                                                        return(
                                                            <span key={i}>
                                                                <ATag t={t} tag={GetDisplayContinent(c)} color={'is-success'}/>
                                                                &nbsp;
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </span>
                                            }
                                            {r._c.roles.regions.countries.length >= 1 &&
                                            <span>
                                                <br/>
                                                {
                                                    r._c.roles.regions.countries.map((c,i) => {
                                                        const split = c.split('.');
                                                        const country = split.length >= 2 ? split[1] : '';
                                                        return(
                                                            <span key={i}>
                                                                <ATag t={t} tag={GetDisplayCountry(country)} color={'is-success'}/>
                                                                &nbsp;
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </span>
                                            }
                                            {r._c.roles.regions.states.length >= 1 &&
                                            <span>
                                                <br/>
                                                {
                                                    r._c.roles.regions.states.map((c,i) => {
                                                        const split = c.split('.');
                                                        const country = split.length >= 3 ? split[1] : '';
                                                        const sta = split.length >= 3 ? split[2] : '';
                                                        return(
                                                            <span key={i}>
                                                                <ATag t={t} tag={GetDisplayState(country,sta)} color={'is-success'}/>
                                                                &nbsp;
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </span>
                                            }
                                            <br/>
                                            <p dangerouslySetInnerHTML={{__html:xss(r.response)}}/>

                                        </div>
                                    </div>

                                                </article>


                                            </span>

                                            {
                                                r._r.map((re,j) => {

                                                    return(
                                                        <div key={j}>
                                                            {
                                                                re.from === 'user' && <span
                                                                style={{
                                                                    marginLeft:'20px',
                                                                    marginRight:'30px',
                                                                    minHeight:'240px'
                                                                }
                                                                }
                                                                className={'box'}
                                                                >
   <article className={'media'}>
                                    <figure className={'media-left'}>
                                        <p className={'image is-64x64'}>
                                            <img src={'/imgs/BFS_Logo_V2.png'}/>
                                            { //@ts-ignore
                                                <p style={{textAlign:'center'}}>{re._u.username}</p> }

                                        </p>
                                    </figure>
                                    <div className={'media-content'}>
                                        <div className={'content'}>
                                            <span style={{display:'inline-flex'}}>
                                                 { //@ts-ignore
                                                     re._u.region.continent !== undefined &&
                                                     //@ts-ignore
                                                     <AGrpTag t={t} leftTag={'my-questions:continent'} tag={GetDisplayContinent(re._u.region.continent)} color={'is-primary'}/>
                                                 }
                                                &nbsp;
                                                { //@ts-ignore
                                                    re._u.region.country !== undefined &&
                                                    //@ts-ignore
                                                    re._u.region.country !== '' &&
                                                    //@ts-ignore
                                                    <AGrpTag t={t} leftTag={'my-questions:country'} tag={GetDisplayCountry(re._u.region.country)} color={'is-primary'}/>
                                                }
                                                &nbsp;
                                                { //@ts-ignore
                                                    re._u.region.state !== undefined &&
                                                    //@ts-ignore
                                                    re._u.region.state !== '' &&
                                                    //@ts-ignore
                                                    <AGrpTag t={t} leftTag={'my-questions:state'} tag={GetDisplayState(re._u.region.country,re._u.region.state)} color={'is-primary'}/>
                                                }
                                            </span>
                                            <br/>
                                            <span style={{display:'inline-flex'}}>
                                                 <AGrpTag t={t} leftTag={'my-questions:asked-on'}  tag={moment(re.date).format("MMM Do YYYY")} color={'is-primary'}/>
                                                &nbsp;

                                            </span>

                                            <p dangerouslySetInnerHTML={{__html:xss(re.response)}}/>
                                        </div>
                                    </div>
                                </article>
                                                                </span>
                                                            }
                                                            {
                                                                re.from === 'coordinator' && <span
                                                                    style={{
                                                                        marginLeft:'30px',
                                                                        marginRight:'20px',
                                                                        minHeight:'240px'
                                                                    }
                                                                    }
                                                                    className={'box'}
                                                                >
   <article className={'media'}>
                                                      <figure className={'media-left'}>
                                        <p className={'image is-64x64'}>
                                            <img src={'/imgs/BFS_MINI_V2.png'}/>
                                            { //@ts-ignore
                                                <p style={{textAlign:'center'}}>{re._c.username}</p> }

                                        </p>
                                    </figure>
                                    <div className={'media-content'}>
                                        <div className={'content'}>
                                          <AGrpTag t={t} leftTag={'my-questions:answered-on'}  tag={moment(question.date).format("MMM Do YYYY")} color={'is-primary'}/>
                                            {re._c.roles.regions.continents.length >= 1 &&
                                            <span>
                                                <br/>
                                                {
                                                    re._c.roles.regions.continents.map((c,i) => {
                                                        return(
                                                            <span key={i}>
                                                                <ATag t={t} tag={GetDisplayContinent(c)} color={'is-success'}/>
                                                                &nbsp;
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </span>
                                            }
                                            {re._c.roles.regions.countries.length >= 1 &&
                                            <span>
                                                <br/>
                                                {
                                                    re._c.roles.regions.countries.map((c,i) => {
                                                        const split = c.split('.');
                                                        const country = split.length >= 2 ? split[1] : '';
                                                        return(
                                                            <span key={i}>
                                                                <ATag t={t} tag={GetDisplayCountry(country)} color={'is-success'}/>
                                                                &nbsp;
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </span>
                                            }
                                            {re._c.roles.regions.states.length >= 1 &&
                                            <span>
                                                <br/>
                                                {
                                                    re._c.roles.regions.states.map((c,i) => {
                                                        const split = c.split('.');
                                                        const country = split.length >= 3 ? split[1] : '';
                                                        const sta = split.length >= 3 ? split[2] : '';
                                                        return(
                                                            <span key={i}>
                                                                <ATag t={t} tag={GetDisplayState(country,sta)} color={'is-success'}/>
                                                                &nbsp;
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </span>
                                            }
                                            <br/>
                                            <p dangerouslySetInnerHTML={{__html:xss(re.response)}}/>

                                        </div>
                                    </div>

                                                </article>

                                                                </span>
                                                            }
                                                            {r._r.length !== r._r.length - 1 && <br/>}
                                                        </div>
                                                    )
                                                })
                                            }

                                            {
                                                this.state[`r-${r._id}-bIsReply`] === true &&
                                                this.state[`r-${r._id}-sent`] !== true &&
                                                    <span style={{display:'flex',justifyContent:'center'}}>
                                                         <ARichQuillEditor
                                                             onChanged={(p) => {
                                                                this.setState({[`r-${r._id}`]:p.html,
                                                                    [`bR-${r._id}`]:p.isEmpty});
                                                             }}
                                                             width={'80%'}
                                                             height={'360px'}
                                                         />
                                                    </span>

                                            }
                                            {
                                                this.state[`r-${r._id}-bIsReply`] === true &&
                                                this.state[`r-${r._id}-sent`]  === true &&
                                                <section>
                                                    <AHeading size={'3'}>
                                                        {t('my-questions:reply-sent')}
                                                    </AHeading>
                                                </section>
                                            }
                                            <br/><br/><br/>
                                            <AFloatLeft>
                                                {
                                                    this.state[`r-${r._id}-bIsReply`] === true &&
                                                    <span >
                                                   <AButton t={t}
                                                            btnText={'common:back'}
                                                            btnType={'is-info'}
                                                            onClicked={() => this.setState({[`r-${r._id}-bIsReply`]:false})} />
                                                </span>
                                                }

                                            </AFloatLeft>
                                            <AFloatRight >
                                                {
                                                    this.state[`r-${r._id}-bIsReply`] !== true &&
                                                    <span >
                                                   <AButton t={t}
                                                            btnText={'my-questions:reply'}
                                                            disabled={question.bClosed}
                                                            btnType={'is-primary'}

                                                            onClicked={() => this.setState({[`r-${r._id}-bIsReply`]:true})} />
                                                </span>
                                                }

                                                {
                                                    this.state[`r-${r._id}-bIsReply`] === true &&
                                                    <span >
                                                   <AButton t={t}
                                                            btnText={'my-questions:send-reply'}
                                                            btnType={this.state[`r-${r._id}-type`] || 'is-primary'}
                                                            btnState={this.state[`r-${r._id}-state`] || ''}
                                                            onClicked={() => {
                                                                if (this.state[`r-${r._id}-state`] !== 'is-loading')
                                                                    this.handleReply(r._id,r._c.username);
                                                            }} />
                                                </span>
                                                }

                                            </AFloatRight>
                                            {i !== replies.length && <br/>}
                                        </div>
                                    )
                                })}
                            </section>

                        </div>
                    </div>
                </Layout>
            )
        else return <div>Loading Error</div>
    }
}

const REDUX = connect(mapStateToProps,mapDispatchToProps);
const I18N = withTranslation(['common','Lang','my-questions']);

export default compose(REDUX,I18N)(QuestionIDPage);