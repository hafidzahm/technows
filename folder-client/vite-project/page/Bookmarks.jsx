import { useEffect, useState } from "react"
import http from "../helper/http";
import Card from "../components/Card";

export default function Bookmarks() {
    const [data, setData] = useState([])
    useEffect(() => {
        getMyBookmark()
    }, [])
    async function getMyBookmark() {
        try {
            let token = localStorage.getItem('access_token')
            let response = await http.get('/bookmarks', {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            console.log(response);
            setData(response.data)
        } catch (error) {
           console.log(error); 
        }
    }
    return (
        <div>
            {
                data.map(el => {
                    return <Card data={el} />
                })
            }
        </div>
    )
}