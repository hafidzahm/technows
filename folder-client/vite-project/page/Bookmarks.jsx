import { useEffect, useState } from "react"
import http from "../helper/http";
import CardBookmark from "../components/CardBookmark";

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

    function submitRead(body) {
        console.log(body);
    }

    async function changeStatus(body) {
        console.log(body);
        let {id} = body
        let token = localStorage.getItem('access_token')
        let response = await http.put(`/bookmarks/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response);
        getMyBookmark()
    }
    function deleteBookmark(body) {
        console.log(body);
    }
    return (
        <div className="flex flex-row flex-wrap w-5xl m-auto justify-center gap-2">
            {
                data.map(el => {
                    return <CardBookmark key={el.id} data={el} submitRead={submitRead} changeStatus={changeStatus} deleteBookmark={deleteBookmark} />
                })
            }
        </div>
    )
}