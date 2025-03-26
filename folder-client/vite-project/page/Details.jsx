import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import http from "../helper/http";
export default function Details() {
  let [params, setParams] = useSearchParams();
  let [isLoading, setIsLoading] = useState(false);
  let [content, setContent] = useState([]);
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
