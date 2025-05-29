import { useEffect, useState } from "react";
import http from "../helper/http";
import Navbar from "./Navbar";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { incremented, incrementedBy } from "../store/counterSlice"
import { fetchNewsSuccess } from "../store/NewsSlice";
import Swal from "sweetalert2";
import { getMyBookmark } from "../store/bookmarksSlice";

export default function Homepage() {
  // const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBookmark());
    fetchData();
    login();
  }, [isLogin]);

  // const reduxState = useSelector(function(state) {
  //     return state
  // })
  const news = useSelector(function (state) {
    return state.news.data;
  });

  const bookmarks = useSelector(function (state) {
    return state.bookmarks.data;
  });

  // console.log(reduxState, '<----reduxState');
  // const counter = useSelector(function(state) {
  //     return state.counter.value
  // })

  // console.log(counter, '<----counter');

  // function add() {
  //     dispatch(incrementedBy(5))
  // }

  function login() {
    let token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
    }
  }

  async function getDetailNews(key) {
    try {
      let { id } = key;
      console.log(id);
      // let response = await http.get(`/details?key=${id}`, {timeout: 10000})
      navigate(`/details?key=${id}`);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      setIsLoading(true);

      let response = await http.get("/news", { timeout: 10000 });
      console.log(response, "<-----fetchData");
      dispatch(fetchNewsSuccess(response.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveNews(key) {
    try {
      let { id } = key;
      console.log(key);
      console.log(bookmarks, "<----bookmarks");
      const bookmarkKey = bookmarks.map((el) => el.key);
      console.log(
        bookmarkKey.find((el) => el === id),
        "<----Bookmarks"
      );
      if (bookmarkKey.find((el) => el === id)) {
        Swal.fire({
          title: "Ups!",
          text: `Berita ini sudah ada di bookmarks`,
          icon: "info",
        });

        return;
      }
      let token = localStorage.getItem("access_token");
      let response = await http.post(
        `/bookmarks?key=${key.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      console.log(response);
      navigate("/bookmarks");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl m-auto p-5 gap-5 min-h-screen">
          {news.map((el) => {
            return (
              <Card
                key={el.key}
                data={el}
                submitKey={getDetailNews}
                saveKey={saveNews}
              />
            );
          })}
        </div>
      ) : (
        <div className="min-h-screen">
          <h1 className="text-gray-700 text-center">Loading...</h1>
        </div>
      )}
    </>
  );
}
