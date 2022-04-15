// @ts-nocheck
import React, {Component} from "react";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import { withTranslation} from "react-i18next";
import Layout from "../../components/Layout";
import {connect} from "react-redux";
import {compose} from "redux";
import {setAuth, setUsr} from "../../store/action";
import {CheckAuth} from "../../lib/Auth";
import ABox from "../../components/elements/ABox";
import {ATAbs} from "../../components/ui/ATabs";
import AInputForm from "../../components/form/AInputForm";
import {AFloatRight} from "../../components/AFloat";
import AButton from "../../components/elements/AButton";
import {axAuth} from "../../utils/axios";
import ALabel from "../../components/form/ALabel";
import {AContinentDropDown} from "../../components/AContinentDropDown";
import {ACountryDropDown} from "../../components/ACountryDropDown";
import {AStateDropDown} from "../../components/AStateDropDown";
import router from "next/router";
import {LOG_ERROR} from "../../utils/logs";
import {AMobileOnly, ATabletOnly} from "../../components/AHiders";
import {ABR} from "../../components/elements/ABR";
import {AMessage} from "../../components/elements/AMessage";
import AHeading from "../../components/AHeading";
import {ABreadCrumbs} from "../../components/elements/ABreadcrumbs";
import {AIcon} from "../../components/elements/AIcon";
import {ADropDown} from "../../components/elements/ADropDown";



interface  IProps {
    t(InTS : string) : string,
    bIsAuth : boolean
};

interface  IState {
    tabIndex : number
    oldPass : string
    newPass : string
    confirmPass : string
    globe : string
    isPasswordsMatched : string
    passState : string
    passType : string
    regionState : string
    regionType: string
    continent_code: string
    country_code : string
    state_code : string
    bPreSelContinent : boolean
    bPreSelCountry : boolean
    bPreSelState : boolean
    bPassLength  : boolean
    bPassLow : boolean
    bPassUp : boolean
    bPassSpecial : boolean
    bPassNumbers : boolean
    updateNewsState : string
    updateNewsType : string
    newsStatus : string
}

export const  getStaticProps = async ({locale}) =>{
    try{
        return{
            props:{
                ...(await serverSideTranslations(locale, ['common','Lang','options','register'])),
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

class OptionsPage extends Component<IProps , IState>{
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
            oldPass : '',
            newPass : '',
            confirmPass: '',
            isPasswordsMatched:'empty',
            globe:'globe',
            regionState:'',
            regionType:'is-primary',
            passState:'',
            passType:'is-primary',
            continent_code:'',
            country_code:'',
            state_code:'',
            bPreSelContinent: false,
            bPreSelCountry: false,
            bPreSelState: false,
            bPassSpecial: false,
            bPassNumbers: false,
            bPassLow : false,
            bPassUp : false,
            bPassLength : false,
            updateNewsType:'is-primary',
            updateNewsState:'',
            newsStatus:'yes'
        } ;

    }

    componentDidMount() {

        // @ts-ignore
        if (this.props.usr){
            // @ts-ignore
            let s : string = 'globe';
            // @ts-ignore
            switch(this.props.usr.region.continent){
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
            this.setState({globe:s,
                continent_code:this.handlePreSel('continent').loc,
                bPreSelContinent:this.handlePreSel('continent').pre,
                country_code:this.handlePreSel('country').loc,
                bPreSelCountry:this.handlePreSel('country').pre,
                state_code:this.handlePreSel('state').loc,
                bPreSelState:this.handlePreSel('state').pre,
            });
        }
    }

    checkPasswords(){
        const {newPass , confirmPass , bPassNumbers, bPassLength,bPassLow,bPassUp, bPassSpecial} = this.state;

        const azLow = /[a-z]/g;
        const azUp = /[A-Z]/g;
        const digits = /[\d]/g;
        const spChara = /[!@#$%^&*]/g;

        this.setState({bPassLength : newPass.length >= 8,bPassNumbers : digits.test(newPass),
            bPassSpecial: spChara.test(newPass),
            bPassUp : azUp.test(newPass), bPassLow : azLow.test(newPass)});


        if (newPass === '' && confirmPass === '') {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }

        if (newPass !== '' && confirmPass === '') {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }else if(newPass === '' && confirmPass !== '')
        {
            this.setState({isPasswordsMatched: 'empty'});

            return;;
        }
        if (newPass !== confirmPass){
            this.setState({isPasswordsMatched:'mismatch'});

            return;;
        }
        if (newPass === confirmPass){
            this.setState({isPasswordsMatched:'match'});
            return;
        }
    }

    handleChangePass(){
        const {oldPass,newPass,isPasswordsMatched} = this.state;
        if ((isPasswordsMatched === 'match') && (bPassLength) && (bPassUp) && (bPassLow) && (bPassSpecial) && (bPassNumbers)){
            this.setState({passState:'is-loading'},() => {
                const body = {
                    oldPass,
                    newPass
                }
                axAuth.put('/change-user-pass',body).then((done) => {
                    if (done){
                        this.setState({passState:'',passType:'is-success'});
                    }
                }).catch((err) => {
                   this.setState({passState:'',passType:'is-danger'});
                });
            });
        }
    }

    handlePreSel(type){
        const {usr} = this.props;
        let obj = {pre:false,loc:''};
        if (usr !== undefined){
            switch (type){
                case 'continent':
                    if (usr.region.continent !== ''){
                        obj.pre = true;
                        obj.loc = usr.region.continent;
                    }
                    break;
                case 'country':
                    if (usr.region.country !== ''){
                        obj.pre = true;
                        obj.loc = usr.region.country;
                    }
                    break;
                case 'state':
                    if (usr.region.state !== ''){
                        obj.pre = true;
                        obj.loc = usr.region.state;
                    }
                    break;
            }
        }
        return obj;
    }

    handleChangeRegion(){
        const {continent_code,country_code,state_code} = this.state;
        this.setState({regionState:'is-loading'},() => {
            const body = {
                continent_code,
                country_code,
                state_code
            }
            axAuth.put('/change-region',body).then((done) => {
                if (done){
                   this.setState({regionState:'',regionType:'is-success'});
                   setTimeout(() => router.push('/auth/user?refer=/auth/my-settings'),550);
                }
            }).catch((err) => {
                this.setState({regionType:'is-danger',regionState:''});
            });
        });
    }

    handleNewsUpdate(){
        this.setState({updateNewsState:'is-loading'},() => {
           const body : object = {
               isYes : this.state.newsStatus
           }
            axAuth.put('/sub/newsletter',body).then((done) => {
                if (done){
                    this.setState({updateNewsState:'',updateNewsType:'is-success'});
                }
            }).catch((err) => {
               LOG_ERROR(err);
            });
        });
    }

    render()
    {

        const {t,bIsAuth} = this.props;
        const {tabIndex,oldPass,newPass,confirmPass,regionState,
            regionType,passState,passType,isPasswordsMatched,globe,continent_code,country_code,state_code,bPreSelCountry,
            bPreSelContinent,bPreSelState,bPassSpecial,bPassUp,bPassLow,bPassLength,bPassNumbers,updateNewsType,updateNewsState,
        newsStatus} = this.state;
        return(
            // @ts-ignore
            <Layout t={t}
                    metadata={{
                        title:`Blessed for Service ~ ${t('common:links.options')} ~`,
                        description:''
                    }}
                    bIsAuth={bIsAuth} AuthRedux={{setAuth:this.props.setAuth,setUsr:this.props.setUsr}}>
                <br/>
                <div className={'container'}>
                    <AMobileOnly>
                        <ABR h={85} />
                    </AMobileOnly>
                    <ATabletOnly>
                        <ABR h={85}/>
                    </ATabletOnly>
                    <AHeading size={'1'}>
                        {t('common:links.options')}
                    </AHeading>
                    {
                        //@ts-ignore
                        <ABreadCrumbs t={t} crumbs={[{icon:'sliders-h-square',display:'common:links.options',url:'/auth/my-account'}]} onCrumbed={() => {}}/>
                    }
                    <div className={'content'}>

                     <ABox>

                         {//
                             //@ts-ignore       {icon:'mailbox',ts:'options:newsletter-settings'}
                             <ATAbs t={t} opts={'is-centered'} tabs={[
                                 {icon:'key',ts:'options:change-pass'},
                                 {icon:globe,ts:'options:change-regions'},


                             ]} onTabSel={(t) => this.setState({tabIndex:t})}/>
                         }
                         {
                             tabIndex === 0 && <section>
                            <AInputForm t={t} inputType={'password'} inputValue={oldPass}
                               label={'options:old-pass'}    onValue={(v) => this.setState({oldPass:v})}/>
                            <AInputForm t={t} inputType={'password'} inputValue={newPass}
                                        isColor={isPasswordsMatched === 'match' ? 'is-success': isPasswordsMatched === 'empty' ? '' : 'is-danger'}
                                        label={'options:new-pass'}      onValue={(v) => this.setState({newPass:v},() => this.checkPasswords())}/>
                            <AInputForm t={t} inputType={'password'} inputValue={confirmPass}
                                        isColor={isPasswordsMatched === 'match' ? 'is-success': isPasswordsMatched === 'empty' ? '' : 'is-danger'}
                                        label={'options:confirm-pass'}     onValue={(v) => this.setState({confirmPass:v},() => this.checkPasswords())}/>
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

                          <AFloatRight>
                              <AButton t={t}
                                       disabled={oldPass === '' && isPasswordsMatched !== 'match'
                                       && bPassLength && bPassUp && bPassLow && bPassNumbers && bPassSpecial
                                       }
                                       btnText={'options:change-pass'}
                                       btnType={passType} btnState={passState} onClicked={() =>{
                                           if (passState !== 'is-loading'){
                                               this.handleChangePass();
                                           }
                              }}/>
                          </AFloatRight>
                                 <br/>
                             </section>
                         }
                         {
                             tabIndex === 1 && <section>
                            <ALabel>{t('common:continent')}</ALabel>
                            <AContinentDropDown t={t} preSelect={bPreSelContinent}
                                                preSelValue={this.handlePreSel('continent').loc}
                                                onSelected={(v) => this.setState({continent_code:v,country_code:'',state_code:'',bPreSelContinent:false,bPreSelCountry:false})}/>
                            <ALabel>{t('common:country')}</ALabel>
                            <ACountryDropDown t={t} preSelect={bPreSelCountry}
                                              preSelValue={this.handlePreSel('country').loc}
                                              code={continent_code} onSelected={(v) => this.setState({country_code:v,state_code:'',bPreSelState:false})} />
                            <ALabel>{t('common:state')}</ALabel>
                            <AStateDropDown t={t}
                                            preSelect={bPreSelState}
                                            preSelValue={this.handlePreSel('state').loc}
                                            code={country_code} onSelected={(v) => this.setState({state_code:v})}/>
                                            <ABR h={45}/>
                                            <AMessage t={t} opt={this.props.usr.regionChangeCount === 3 ? 'is-danger' : 'is-warning'}
                                                      msg={this.props.usr.regionChangeCount === 3 ? 'options:region-warning' : 'options:region-notice'}/>
                            <AFloatRight>
                                <AButton t={t} btnIcon={globe} btnText={'options:change-regions'}
                                         disabled={this.props.usr && this.props.usr.bCanChangeRegions ? false : true}
                                         btnState={regionState}
                                         btnType={regionType} onClicked={() => {
                                             if (regionState !== 'is-loading')
                                                 this.handleChangeRegion();
                                }}/>
                            </AFloatRight>
                            <br/>
                             </section>
                         }
                         {
                             tabIndex === 2 && <section>
                                 <br/>
                            <ALabel>
                                {t('options:newsletter-subscribe')}
                            </ALabel>
                                 <ADropDown t={t} dropText={'options:do-newsletters'}
                                            list={[{display:'options:newsletter-yes',value:'yes'},
                                                {display:'options:newsletter-no',value:'no'}]} onSelected={(v) => {
                                                this.setState({newsStatus:v});
                                 }}/>
                                 <AFloatRight>
                                     <AButton t={t} btnText={'options:update-newsletter'}
                                              btnState={updateNewsState}
                                              btnType={updateNewsType}
                                              onClicked={() => {
                                                  if (updateNewsState !== 'is-loading'){
                                                      this.handleNewsUpdate();
                                                  }
                                              }} />
                                 </AFloatRight>
                             </section>
                         }


                     </ABox>
                    <br/><br/>
                        {tabIndex === 1 && <span><br/><br/><br/></span>}
                    </div>
                </div>
            </Layout>
        )
    }
}

const TS = withTranslation(['common','Lang','options','register']);
const REDUX = connect(mapStateToProps,mapDispatchToProps);

export default compose(TS,REDUX)(OptionsPage);