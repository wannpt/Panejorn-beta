export const GetPlanCollection = (params: any) => {
    console.log('getting...')
   fetch('http://localhost:8000/getPlanCollection?userId=' + params, {
       method:'GET',
   })
   .then(res => res.json())
   .then((result) => {
       console.log(result)
       return result
   })
}