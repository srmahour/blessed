//@ts-nocheck
import React, {Component} from "react";
import Layout from "../components/Layout";
import {withTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AHeading from "../components/AHeading";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../store/action";
import {AIcon} from "../components/elements/AIcon";
import {axAuth, axNoAuth} from "../utils/axios";
import router from 'next/router';
import {AFloatRight} from "../components/AFloat";
import AButton from "../components/elements/AButton";
import {HandleError} from "../lib/Utils";
import {LOG_ERROR} from "../utils/logs";
import {AMobileOnly, ATabletOnly} from "../components/AHiders";
import {ABR} from "../components/elements/ABR";
import {ABreadCrumbs} from "../components/elements/ABreadcrumbs";

interface IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
    documents : [object]
}

interface IState {
    categories : [object]
    sense_categories : [object]
    catIndex : string
    sense : number
    bIsSense : boolean
    q1 : [object]
    q2 : [object]
    q3 : [object]
    q4 : [object]
    q5 : [object]
    nq1 : number
    nq2 : number
    nq3 : number
    nq4 : number
    nq5 : number
    submitState : string
    submitType : string
}

export const  getServerSideProps = async (ctx) =>{

    const protocolRes = await  axNoAuth.get('/protocols?docType=common');

    try{
        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','documents'])),
                documents : protocolRes.data
            }
        }
    }catch (e) {
        LOG_ERROR(e);
        return{
            props:{
                ...(await serverSideTranslations(ctx.locale, ['common','Lang','documents'])),
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
class DocumentsPage extends Component<IProps, IState>{

    constructor(props) {
        super(props);

        this.state = { //@ts-ignore
            categories : [{icon:'book',label:'documents:aliens',cat:'asp'},
                {icon:'book',label:'documents:antarctica-pyramid',cat:'atp'},
                {icon:'book',label:'documents:bloodlines',cat:'bc'},
                {icon:'book',label:'documents:books',cat:'br'},
                {icon:'book',label:'documents:cabal',cat:'cab'},
                {icon:'book',label:'documents:dumb',cat:'dumb'},
                {icon:'book',label:'documents:vxi',cat:'vxi'},
                {icon:'book',label:'documents:map',cat:'map'},
                {icon:'book',label:'documents:mc',cat:'mc'},
                {icon:'book',label:'documents:patw',cat:'patw'},
                {icon:'bible',label:'documents:miss-bible',cat:'bib'},
                {icon:'book',label:'documents:prayer',cat:'prp'},
                {icon:'book',label:'documents:space',cat:'spp'},
                {icon:'book',label:'documents:sym',cat:'sym'},
                {icon:'book',label:'documents:tech',cat:'tech'},
                {icon:'book',label:'documents:wes',cat:'wesp'},
            ], //@ts-ignore
            sense_categories:[
                {icon:'book',label:'documents:bloodlines',cat:'bc'},
                {icon:'book',label:'documents:books',cat:'br'},
                {icon:'book',label:'documents:cabal',cat:'cab'},
                {icon:'book',label:'documents:dumb',cat:'dumb'},
                {icon:'book',label:'documents:vxi',cat:'vxi'},
                {icon:'book',label:'documents:map',cat:'map'},
                {icon:'book',label:'documents:mc',cat:'mc'},
                {icon:'book',label:'documents:patw',cat:'patw'},
                {icon:'book',label:'documents:prayer',cat:'prp'},
                {icon:'book',label:'documents:sym',cat:'sym'},

                {icon:'book',label:'documents:tech',cat:'tech'},
            ],
            bIsSense:true,
            catIndex : '',
            sense:0,
            q1:[{display:'documents:earth-q-1',value:-1},
                {display:'documents:earth-q-2',value:-1},
                {display:'documents:earth-q-3',value:1}
            ],
            q2:[{display:'documents:space-q-1',value:-1},
                {display:'documents:space-q-2',value:-1},
                {display:'documents:space-q-3',value:-1},
                {display:'documents:space-q-4',value:1}
            ],
            q3:[{display:'documents:aliens-q-1',value:-1},
                {display:'documents:aliens-q-2',value:-1},
                {display:'documents:aliens-q-3',value:-1},
                {display:'documents:aliens-q-4',value:-1},
                {display:'documents:aliens-q-5',value:1},
            ],
            q4:[  {display:'documents:spp-q-1',value:-1},
                {display:'documents:spp-q-2',value:1},

            ],
            q5:[
                {display:'documents:iam-q-1',value:-1},
                {display:'documents:iam-q-2',value:1},
            ],
            nq1:0,
            nq2:0,
            nq3:0,
            nq4:0,
            nq5:0,
            submitType:'is-primary',
            submitState:''
        }
    }

    componentDidMount() {

        if ((this.props.usr) && (this.props.usr.sense) && (this.props.usr.sense === 5))
            this.setState({bIsSense:false});
    }

    filterDocuments(filter : string){
        return (
            <div>
                {   this.props.documents.filter(index => index.category === filter).map((d,i) => {
                    return(<span>
                          <a  style={{display:'block'}}
                              target={'_blank'}
                              rel={'noopener noreferrer'}
                              href={d.url}>{d.url_name}</a> &nbsp;
                    </span>)
                })}
            </div>
        )
    }

    handleSubmitSense(){
        const {nq1,nq2,nq3,nq4,nq5,sense} = this.state;
        const count = nq1 + nq2 + nq3 + nq4 + nq5;
        const Body = {
            sense: count
        };
        this.setState({submitState:'is-loading'},() => {

            axAuth.post('/submit-doc-sense',Body).then((done) => {
                if (done){
                    router.reload();
                }
            }).catch((err) => {
                const E = HandleError(err);
                LOG_ERROR(err);
            });
        });

    }

     GetCategory(bSense : boolean) : boolean{
       const {bIsSense,categories,sense_categories} = this.state;
       if (bIsSense)
           return sense_categories.sort((a,b) => {
                if (a.azSort > b.azSort){
                    return 1;
                }
                if (b.azSort < b.azSort){
                    return -1;
                }
                return 0;

           });
       else
           return categories.sort((a,b) => {
               if (a.azSort > b.azSort){
                   return 1;
               }
               if (b.azSort < b.azSort){
                   return -1;
               }
               return 0;
           });;
    }

    render(){
        const bHide = true;

        const {t,bIsAuth,documents} = this.props;
        const {categories,catIndex,sense,q1,q2,q3,q4,q5,submitType,submitState} = this.state;

        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.documents')} ~`,
                        keywords:['Blessed for Service','information','education','important','documents','health protocols',
                        'truth','Deep Underground Military Base(DUMBs)','Vaccine Mandate','Deep State','Knowledge Discovery',
                            'exploration','Wellness Awareness','Social Justice','Spirituality'
                        ],
                        description:'Blessed for Service provides information and education in the form of Important Documents and Health Protocols to assist you in finding Truth about the Deep Underground Military Base (DUMBs), Vaccine Mandate, Deep State, etc. through Knowledge Discovery, Exploration, Wellness Awareness, Social Justice, and Spirituality.\n'
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <AMobileOnly>
                    <br/><br/>  <br/><br/>
                </AMobileOnly>
                <ATabletOnly>
                    <br/><br/>  <br/><br/>  <br/><br/>  <br/><br/> <br/> <br/>
                </ATabletOnly>

                    <AHeading size={'1'}>
                        {t('common:links.documents')}
                    </AHeading>
                {
                    //@ts-ignore
                    <ABreadCrumbs t={t} crumbs={[{icon:'file-exclamation',display:'common:links.documents',url:'/documents'}]} onCrumbed={() => {}}/>
                }
                <div className={'tile is-ancestor'}>
                    <div className={'tile is-vertical is-2 is-parent'}>
                        <div className={'tile is-child panel is-primary'}>
                        <p onClick={() => this.setState({catIndex:''})} className={'panel-heading'}>
                            {t('documents:categories')}
                        </p>
                            {
                                this.GetCategory(this.state.bIsSense).map((c,i) => {
                                return(
                                    <a
                                        key={i}
                                        onMouseLeave={() => {
                                            //@ts-ignore
                                            this.setState({[`bCat${i}Hov`]:false});
                                        }}
                                        onMouseEnter={() => {
                                            //@ts-ignore
                                            this.setState({[`bCat${i}Hov`]:true});
                                        }}
                                        onClick={() => this.setState({catIndex:c.cat})}
                                        className={`panel-block ${c.cat === catIndex ? 'is-active' : ''} ${this.state[`bCat${i}Hov`] === true ? 'is-primary' : ''}`}>
                                        <span className={'panel-icon'}>
                                            <AIcon icon={ //@ts-ignore
                                                c.icon}/>
                                        </span>
                                        {//@ts-ignore
                                            t(c.label)}
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    <div className={'tile is-parent'}>
                        <div className={'tile is-child box'}>
                            {catIndex === '' && <p>{t('documents:blurb')}</p>}
                            {catIndex === ''  && <br/>}
                            {bIsAuth && <section id={'q-sense'}>
                                {catIndex === ''  && <br/>}
                                {catIndex === '' && this.props.usr && this.props.usr.bHasTakenSense !== true && bHide !== true && <section>
                                    {t('documents:earth-q')}
                                    <br/>
                                    <div className={'field'}>
                                        {q1.map((q,i) => {
                                            return(
                                                <span key={`Q1-${i}`}>
                                                    <input
                                                        onClick={() => {
                                                            let s = -1;
                                                            if (i === 2) //correct one
                                                                s = 1;
                                                            this.setState({[`q1-${i}`]:!this.state[`q1-${i}`],nq1:s},() => {
                                                               for(let I = 0; I < q1.length; I++){
                                                                   if ((i !== I) && (this.state[`q1-${I}`] === true) )
                                                                       this.setState({[`q1-${I}`]:false})
                                                               }
                                                            });
                                                        }}
                                                        checked={this.state[`q1-${i}`]}
                                                        className={'is-checkradio is-info'}
                                                    type={'radio'}
                                                        id={`q1-${i}`}/>
                                                    <label for={`q1-${i}`}>{t(q.display)}</label>
                                                    {i !== q1.length - 1 && <br/>}
                                                </span>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                    {t('documents:space-q')}
                                    <br/>
                                    <div className={'field'}>
                                        {q2.map((q, i) => {
                                            return (
                                                <span key={`Q2-${i}`}>
                                                    <input
                                                        onClick={() => {
                                                            let s = -1;
                                                            if (i === 3) //correct one
                                                                s = 1;
                                                            this.setState({
                                                                [`q2-${i}`]: !this.state[`q2-${i}`],
                                                                nq2: s
                                                            }, () => {
                                                                for (let I = 0; I < q1.length; I++) {
                                                                    if ((i !== I) && (this.state[`q2-${I}`] === true))
                                                                        this.setState({[`q2-${I}`]: false})
                                                                }
                                                            });
                                                        }}
                                                        checked={this.state[`q2-${i}`]}
                                                        className={'is-checkradio is-info'}
                                                        type={'radio'}
                                                        id={`q2-${i}`}/>
                                                    <label htmlFor={`q2-${i}`}>{t(q.display)}</label>
                                                    {i !== q2.length - 1 && <br/>}
                                                </span>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                    {t('documents:aliens-q')}
                                    <br/>
                                    <div className={'field'}>
                                        {q3.map((q, i) => {
                                            return (
                                                <span key={`Q3-${i}`}>
                                                    <input
                                                        onClick={() => {
                                                            let s = -1;
                                                            if (i === 4) //correct one
                                                                s = 1;
                                                            this.setState({
                                                                [`q3-${i}`]: !this.state[`q3-${i}`],
                                                                nq3: s
                                                            }, () => {
                                                                for (let I = 0; I < q1.length; I++) {
                                                                    if ((i !== I) && (this.state[`q3-${I}`] === true))
                                                                        this.setState({[`q3-${I}`]: false})
                                                                }
                                                            });
                                                        }}
                                                        checked={this.state[`q3-${i}`]}
                                                        className={'is-checkradio is-info'}
                                                        type={'radio'}
                                                        id={`q3-${i}`}/>
                                                    <label htmlFor={`q3-${i}`}>{t(q.display)}</label>
                                                    {i !== q3.length - 1 && <br/>}
                                                </span>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                    {t('documents:spp-q')}
                                    <br/>
                                    <div className={'field'}>
                                        {q4.map((q, i) => {
                                            return (
                                                <span key={`Q4-${i}`}>
                                                    <input
                                                        onClick={() => {
                                                            let s = -1;
                                                            if (i === 1) //correct one
                                                                s = 1;
                                                            this.setState({
                                                                [`q4-${i}`]: !this.state[`q4-${i}`],
                                                                nq4: s
                                                            }, () => {
                                                                for (let I = 0; I < q1.length; I++) {
                                                                    if ((i !== I) && (this.state[`q4-${I}`] === true))
                                                                        this.setState({[`q4-${I}`]: false})
                                                                }
                                                            });
                                                        }}
                                                        checked={this.state[`q4-${i}`]}
                                                        className={'is-checkradio is-info'}
                                                        type={'radio'}
                                                        id={`q4-${i}`}/>
                                                    <label htmlFor={`q4-${i}`}>{t(q.display)}</label>
                                                    {i !== q4.length - 1 && <br/>}
                                                </span>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                    {t('documents:iam-q')}
                                    <br/>
                                    <div className={'field'}>
                                        {q5.map((q, i) => {
                                            return (
                                                <span key={`Q5-${i}`}>
                                                    <input
                                                        onClick={() => {
                                                            let s = -1;
                                                            if (i === 1) //correct one
                                                                s = 1;
                                                            this.setState({
                                                                [`q5-${i}`]: !this.state[`q5-${i}`],
                                                                nq5: s
                                                            }, () => {
                                                                for (let I = 0; I < q1.length; I++) {
                                                                    if ((i !== I) && (this.state[`q5-${I}`] === true))
                                                                        this.setState({[`q5-${I}`]: false})
                                                                }
                                                            });
                                                        }}
                                                        checked={this.state[`q5-${i}`]}
                                                        className={'is-checkradio is-info'}
                                                        type={'radio'}
                                                        id={`q5-${i}`}/>
                                                    <label htmlFor={`q5-${i}`}>{t(q.display)}</label>
                                                    {i !== q5.length - 1 && <br/>}
                                                </span>
                                            )
                                        })}
                                    </div>
                                    <AFloatRight>
                                        <AButton t={t} btnText={'common:submit'}
                                                 btnState={submitState}
                                                 btnType={submitType} onClicked={() => {
                                                     if (submitState !== 'is-loading')
                                                         this.handleSubmitSense();
                                        }}/>
                                    </AFloatRight>
                                </section>}
                            </section>}


                                {
                                catIndex !== '' &&
                                    this.filterDocuments(catIndex)
                                 }


                        </div>
                    </div>
                </div>


            </Layout>
        )
    }
}


const TS = withTranslation(['common','Lang','documents']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);
export default compose(TS,REDUX)(DocumentsPage);