import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import http from "../helper/http";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookmark } from "../store/bookmarksSlice";
export default function Details() {
  let [params, setParams] = useSearchParams();
  let [isLoading, setIsLoading] = useState(false);
  let [isSaving, setIsSaving] = useState(false);
  let [content, setContent] = useState([]);
  let [title, setTitle] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const bookmarks = useSelector(function (state) {
    return state.bookmarks.data
  })
  useEffect(() => {
    dispatch(getMyBookmark());
    getDetailById();
  }, []);

  async function getDetailById() {
    try {
      setIsLoading(true);
      let response = await http.get(`/details?key=${params.get("key")}`, {
        timeout: 10000,
      });
      console.log(response, "<------response");
      console.log(response.data.results.content, "<------response");
      let data = response.data.results.content;
      setTitle(response.data.results.title);
      setContent(data);
      parsingContent();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSummarize() {
    console.log(params.get("key"));
    navigate(`/summarize?key=${params.get("key")}`);
  }
  async function onBookmarks() {
    try {
      setIsSaving(true)
      console.log(params.get("key"));
      console.log(bookmarks, "<----bookmarks");
      const bookmarkKey = bookmarks.map((el) => el.key);
      console.log(bookmarkKey, "<----isExist");

      console.log(bookmarkKey[0], params.get("key"));


      console.log(bookmarkKey.find(el => el === params.get('key')), "<----Bookmarks");
      if(bookmarkKey.find(el => el === params.get('key'))){
        setIsSaving(false)
        Swal.fire({
          title: "Ups!",
          text: `Berita ini sudah ada di bookmarks`,
          icon: "info",
        });
      
        return
      }
      let token = localStorage.getItem('access_token')
      let response = await http.post(`/bookmarks?key=${params.get("key")}`, {}, {
       headers: {
           'Authorization': `Bearer ${token}`
       },
       timeout: 10000
      })
      console.log(response);  
      setIsSaving(false)
      navigate("/bookmarks")
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        console.log(error);
        Swal.fire({
          title: "Ups!",
          text: `Silakan login dulu untuk memakai fitur Save to Bookmarks`,
          icon: "error",
        });
        navigate("/login");
      }
    }
  }

  async function parsingContent() {
    let container = "";
    console.log(content);
    console.log(container, "<-------parsed");
  }

  return (
    <div className="min-h-screen text-gray-700">
      {isLoading ? (
        <div className=" w-10 m-auto">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="max-w-2xl m-auto">
          <div className="flex flex-row gap-3">
          <button
            onClick={onSummarize}
            className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Summarize with AI
          </button>
          <button
            onClick={onBookmarks}
            className=" px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300"
          >
            {isSaving ? "Memproses..." : "Save to Bookmarks"}
          </button>
          </div>
          
          <div className="text-4xl mt-5">{title}</div>
          <div className=" border border-gray-500 mt-5 bg-gray-100">
            {content?.map((el, index) => {
              if (el.startsWith("http")) {
                return <img key={index} src={el} className="p-5"></img>;
              } else {
                return <div key={index} className="p-5">{el}</div>;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
