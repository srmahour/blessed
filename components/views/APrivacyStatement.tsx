import AHeading from "../AHeading";

export const APrivacyStatement = ({t,bScroll} : {t(ts: string) : string,bScroll : boolean}) => {

    return(
        <section
        style={
            bScroll ? {backgroundColor:'#a4cdec',
                    borderRadius:'4px',overflowY:'scroll',
                    padding:'5px',
                    maxHeight:'250px',
                    overflowX:'auto'} :
            {backgroundColor:'#a4cdec',
            borderRadius:'4px',
            padding:'5px',
           }}
        >
            <p >
                {t('privacy:pre-0')}
            </p>
            <AHeading size={'4'}>
                {t('privacy:part-1')}
            </AHeading>
            <p > {t('privacy:p1-1')}
            </p>
            <p>
                {t('privacy:such')}<br/>
                {t('privacy:name')}<br/>
                {t('privacy:bill-adr')}<br/>
                {t('privacy:ph-no')}<br/>
                {t('privacy:email-adr')}
                <br/>
                <p style={{textIndent:'20px'}}>
                    {t('privacy:p1-2')}
                </p>
            </p>
            <AHeading size={'4'}>
                {t('privacy:part-2')}
            </AHeading>
            <p style={{textIndent:'20px'}}>
                {t('privacy:p2-1')}
            </p>
            <p style={{textIndent:'20px'}}>
                {t('privacy:p2-2')}
            </p>
            <p style={{textIndent:'20px'}}>
                {t('privacy:p2-3')}
            </p>
            <AHeading size={'4'}>
                {t('privacy:part-3')}
            </AHeading>
            <p style={{textIndent:'20px'}}>
                {t('privacy:p3-1')}
            </p>
            <AHeading size={'4'}>
                {t('privacy:part-4')}
            </AHeading>
            <p style={{textIndent:'20px'}}>
                {t('privacy:p4-1')}
            </p>
        </section>
    )
}