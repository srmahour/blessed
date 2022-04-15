

export const HandleError = (err : object) => {

  if (err){
    // @ts-ignore
    if (err.response){
      // @ts-ignore
      if (err.response.data){

        // @ts-ignore
        return {res:err.response.data,bIsSuccess:true};
      }
    }
  }
  return {res: {},bIsSuccess:false};
};