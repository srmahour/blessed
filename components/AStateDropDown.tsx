import {ADropDown} from "./elements/ADropDown";
import {useFetch} from "react-async";
import {  useEffect} from "react";
import {LOG_ERROR} from "../utils/logs";


export function AStateDropDown({t,code,onSelected,preSelect,preSelValue,bIsEmpty}
: {t(ts : string) : string , code : string, onSelected(value : any) : any,preSelect? : boolean, preSelValue? : string,bIsEmpty?(bool : boolean)}){

    if(code !== ''){

        const {data , error} = useFetch(`${process.env.NEXT_PUBLIC_BFS_API}/states?form&code=${code}`,{
            headers: { accept: "application/json" },
        });

        if (error) {
            LOG_ERROR(error);
            return error.message;
        }
        if (data){
            let selText = t('common:select-state');
            if (preSelect){
                if (preSelValue === '') //AKA No data for state etc need to stop
                {

                }
                else {
                    // @ts-ignore
                    selText = data.result.find(i => i.value === preSelValue).display;
                }

            }
            //@ts-ignore
            console.log('State # is ' , data.result.length);
            //@ts-ignore
            const bNoStates = data.result.length === 0 ? true : false;

            return(
                // @ts-ignore
                <span>

                      <ADropDown t={t} empty={bNoStates} bIsEmpty={(bool) => bIsEmpty(bool)}   dropText={selText} list={// @ts-ignore
                          data.result} onSelected={(v) => {onSelected(v)}}/>
                </span>
            )
        }
        else
            return <ADropDown t={t} dropText={'common:select-state'} list={[]} onSelected={(v) => {}}/>;

        useEffect(() => {

        },[code]);
    }
    else
        return <ADropDown t={t} dropText={'common:select-state'} list={[]} onSelected={(v) => {}}/>;

}



