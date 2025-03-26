import { useEffect } from "react"
import http from "../helper/http"
import Navbar from "./Navbar"

export default function Homepage() {
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        let response = await http.get('/news', {timeout: 10000})
        console.log(response, '<-----fetchData');
    }
    return(
        <>
        <Navbar/>
        <div>Homepage</div>
        </>
    )
}