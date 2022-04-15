import axios from 'axios';
import Cookies from 'js-cookie';
import {LOG_ERROR} from "./logs";

export const axNoAuth = axios.create({
   baseURL:process.env.NEXT_PUBLIC_BFS_API,
   timeout:6000 * 90
});

export const axAuth = axios.create({
   baseURL:process.env.NEXT_PUBLIC_BFS_API,
   timeout:6000 * 90
});



axAuth.interceptors.request.use(config => {

   if (process.browser){
      config.headers['authorization'] = Cookies.get('token');
   }

   return config;
},error => {
   Promise.reject(error);
});




export const IsAuth = async () => {
   try{
      const auth = await  axAuth.get('/verify-auth');
      if(auth){

         return {success:true,usr:auth.data.usr};
      }
   }catch (e){
      LOG_ERROR(e);
      return {success:false,usr:{}};
   }
}