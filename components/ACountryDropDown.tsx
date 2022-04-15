import {ADropDown} from "./elements/ADropDown";
import {useFetch} from "react-async";
import { useState, useEffect} from "react";
import {LOG_ERROR} from "../utils/logs";
import {array} from "prop-types";


export function ACountryDropDown({t,code,onSelected,preSelect,preSelValue} : {t(ts : string) : string , code : string, onSelected(value : any) : any,preSelect? : boolean, preSelValue? : string}){

    if(code !== ''){
        return GetCountries(t,code , (value) => {
            onSelected(value);
        },preSelect,preSelValue);
        useEffect(() => {

        },[code]);
    }
    else
        return <ADropDown t={t} dropText={'common:select-country'} list={[]} onSelected={(v) => {}}/>;

}



const GetCountries = (t ,code : string , onSelect : (value : string) => void,preSelect? : boolean , preSelValue? : string) => {
    const {data , error} = useFetch(`${process.env.NEXT_PUBLIC_BFS_API}/countries?form&code=${code}`,{
        headers: { accept: "application/json" },
    });

    if (error) {
        LOG_ERROR(error);
        return error.message;
    }
    if (data){
        console.log(data);
        let selText = t('common:select-country');
        if (preSelect){
            if (preSelValue === '') //AKA No data for state etc need to stop
            {

            }
            else {
                // @ts-ignore
                if (data.result){
                    // @ts-ignore
                    selText = data.result.find(i => i.value === preSelValue).display;
                }

            }
        }
        return(
            // @ts-ignore
            <ADropDown t={t} bFlag={true} dropText={selText} list={data.result} onSelected={(v) => {onSelect(v)}}/>
        )
    }

    return <div>Loading</div>;
}