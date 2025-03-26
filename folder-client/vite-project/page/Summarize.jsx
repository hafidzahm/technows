import { useSearchParams } from "react-router"
import http from "../helper/http"
import { useEffect, useState } from "react"

export default function Summarize() {
    useEffect(() => {
        getSummarize()
    }, [])
    let [params, setParams] = useSearchParams()
    let [data, setData] = useState({})

    async function getSummarize() {
        let token = localStorage.getItem('access_token')
        let response = await http.get(`/details-summarize?key=${params.get('key')}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: 10000
        })
        console.log(response);
        setData(response.data)
    }
    return(
        <>
        
            <div>
                <h1>when</h1>
                <p>{data.when}</p>
                <h1>who</h1>
                <p>{data.who}</p>
                <h1>what</h1>
                <p>{data.what}</p>
                <h1>why</h1>
                <p>{data.why}</p>
                <h1>where</h1>
                <p>{data.where}</p>
                <h1>how</h1>
                <p>{data.how}</p>
            </div>
        
        </>
    )
}