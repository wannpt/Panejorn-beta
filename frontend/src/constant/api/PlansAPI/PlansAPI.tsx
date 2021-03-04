import { Result } from "antd"

export const GetPlanCollection = (params: any) => {
    console.log('getting...')
   fetch('https://localhost:8000/getPlanCollection?userId=' + params)
   .then(res => res.json())
   .then((result) => {
       console.log(result)
       return result
   })
}