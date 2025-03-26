import { useEffect, useState } from "react";

export default function Card(props) {
  let { data, submitKey, saveKey } = props;
  let [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    let token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
    }
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between">
      <div>
        <img
          className="rounded-t-lg object-cover w-full h-48"
          src={data.thumb}
          alt=""
        />
      </div>

      <div className="p-4">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {data.title}
        </h5>
      </div>
      <div className="p-4">
        <p className="mb-3 font-normal text-gray-700">
          {data.desc}
        </p>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <button
          onClick={() => {
            submitKey({ id: data.key });
          }}
          className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Baca
        </button>
        {isLogin ? (
          <button
            onClick={() => {
              saveKey({ id: data.key });
            }}
            className=" px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Simpan ke Bookmark
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
