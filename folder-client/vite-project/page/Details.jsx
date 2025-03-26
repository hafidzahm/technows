import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import http from "../helper/http";
export default function Details() {
  let [params, setParams] = useSearchParams();
  let [isLoading, setIsLoading] = useState(false);
  let [content, setContent] = useState([]);
  let [title, setTitle] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
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

  async function parsingContent() {
    let container = "";
    console.log(content);
    console.log(container, "<-------parsed");
  }

  return (
    <>
      {isLoading ? (
        <div className=" w-10 m-auto">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="max-w-2xl m-auto">
          <button
            onClick={onSummarize}
            className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Summarize with AI
          </button>
          <div className="text-4xl mt-5">{title}</div>
          <div>
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
    </>
  );
}
