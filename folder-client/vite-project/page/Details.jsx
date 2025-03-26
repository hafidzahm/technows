import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import http from "../helper/http";
export default function Details() {
  let [params, setParams] = useSearchParams();
  let [isLoading, setIsLoading] = useState(false);
  let [content, setContent] = useState([]);
  let navigate = useNavigate()
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

      setContent(data);
      parsingContent();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSummarize() {
    console.log(params.get('key'));
    navigate(`/summarize?key=${params.get('key')}`)
  }

  async function parsingContent() {
    let container = "";
    console.log(content);
    console.log(container, "<-------parsed");
  }

  return (
    <>
      <div>Details: {params.get("key")}</div>
      {isLoading ? <span>Loading...</span> : <span>finish loading</span>}
      <div className="max-w-2xl m-auto">
        <button
          onClick={onSummarize}
          className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
        >
          Summarize
        </button>
        {content?.map((el, index) => {
          if (el.startsWith("http")) {
            return <img key={index} src={el}></img>;
          } else {
            return <div key={index}>{el}</div>;
          }
        })}
      </div>
    </>
  );
}
