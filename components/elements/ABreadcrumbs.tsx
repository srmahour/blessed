import {AIcon} from "./AIcon";
import Link from 'next/link';
import router from 'next/router';

interface ICrumb {
    display : string
    icon : string
}

interface ICrumbs extends Array<ICrumb>{}

export const ABreadCrumbs = ({t,crumbs,onCrumbed,opts} : {t(ts:string) : string,crumbs : [ICrumbs],onCrumbed(crumb: number) : void,opts? : object}) => {
   const pathname = router.pathname;

   const asPath = router.asPath;

    return(
        <nav className={`breadcrumb ${opts ? opts : 'is-centered'}`} aria-label={'breadcrumbs'}>
            <ul>
                <li className={`${pathname === '/' ? 'is-active' : ''}`}>
                    <a
                        onClick={() => onCrumbed(0)}
                        href={'/'}>
                        <span className={'icon is-small'}>
                            <AIcon icon={'home'}/>
                        </span>
                        <span>{t('common:links.home')}</span>
                    </a>
                </li>
                {
                    crumbs.map((c,i) => {


                        return(
                            <li
                                className={ //@ts-ignore
                                    `${asPath === c.url ? 'is-active' : ''}`}
                                key={i}>
                                <Link passHref
                                  href={ // @ts-ignore
                                      c.url}
                                >
                                <a
                                onClick={() => onCrumbed(i +1)}
                                >
                                    <span className={'icon is-small'}>
                                        {//@ts-ignore
                                            c.icon !== '' &&
                                            <AIcon icon={//@ts-ignore
                                                c.icon}/>
                                        }

                                    </span>
                                    <span>{t(
                                                //@ts-ignore
                                            c.display)}</span>
                                </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
};