import { useEffect, useState } from "react"
import http from "../helper/http"
import Navbar from "./Navbar"
import Card from "../components/Card"

export default function Homepage() {
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setIsLoading(true)
        let response = await http.get('/news', {timeout: 10000})
        console.log(response, '<-----fetchData');
        setNews(response.data)
        setIsLoading(false)
    }
    return(
        <>
        <Navbar/>
        <div className="flex flex-row flex-wrap justify-center w-5xl gap-5 m-auto">
        {
            isLoading ? <div>Loading...</div> : news.map(el => {
                return <Card key={el.key} data={el}/>
            })
        }
        </div>
        
        </>
    )
}