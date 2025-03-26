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
          title: "Ups!",
          text: `Silakan login dulu untuk memakai fitur Summarize with AI`,
          icon: "error",
        });
      }
    }
  }
  return (
    <div className="min-h-screen">
    {Object.keys(data).length > 1 ? <div className="w-2xl m-auto border-gray-500 bg-gray-200 p-5">
        <div className="text-2xl mb-3">Hasil rangkuman:</div>
      <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"><span>Kapan berita tersebut terjadi atau diberitakan?</span></div>
        <p>{data.when}</p>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"><span>Siapa target, objek, atau narasumber dari berita tersebut?</span></div>
        <p>{data.who}</p>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"><span>Apa target, atau objek yang diberitakan?</span></div>
        <p>{data.what}</p>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"><span>Apa alasan topik tersebut menarik untuk dibahas?</span></div>
        <p>{data.why}</p>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"><span>Dimana tempat objek diberitakan?</span></div>
        <p>{data.where}</p>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"><span>Spesifikasi teknologi atau objeknya seperti apa?</span></div>
        <p>{data.how}</p>
      </div> : <div className="w-100 text-gray-700 m-auto">Tunggu sebentar... Sedang merangkum berita..</div>} 
      
    </div>
  );
}
