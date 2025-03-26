import { useSearchParams } from "react-router";
import http from "../helper/http";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Summarize() {
  useEffect(() => {
    getSummarize();
  }, []);
  let [params, setParams] = useSearchParams();
  let [data, setData] = useState({});

  async function getSummarize() {
    try {
      let token = localStorage.getItem("access_token");
      let response = await http.get(
        `/details-summarize?key=${params.get("key")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: `Silakan login dulu untuk memakai fitur Summarize with AI`,
          icon: "error",
        });
      }
    }
  }
  return (
    <>
      <div className="w-2xl m-auto">
      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Kapan berita tersebut terjadi atau diberitakan?</span>
        <p>{data.when}</p>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Siapa target, objek, atau narasumber dari berita tersebut?</span>
        <p>{data.who}</p>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Apa target, atau objek yang diberitakan?</span>
        <p>{data.what}</p>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Apa alasan topik tersebut menarik untuk dibahas?</span>
        <p>{data.why}</p>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Dimana tempat objek diberitakan?</span>
        <p>{data.where}</p>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Spesifikasi teknologi atau objeknya seperti apa?</span>
        <p>{data.how}</p>
      </div>
    </>
  );
}
