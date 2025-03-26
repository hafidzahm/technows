export default function CardBookmark(props) {
  let { data, submitRead, deleteBookmark, changeStatus } = props;

  return (
    <>
      {data.statusRead ? (
       <div className="max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between">
       <div>
         <img
           className="rounded-t-lg object-cover w-full h-48"
           src={data.thumb}
           alt=""
         />
       </div>

       <div className="p-5">
         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-500">
           {data.title}
         </h5>
         <div>
           <p className="mb-3 font-normal text-gray-700">{data.desc}</p>
         </div>
       </div>
       <div className="flex flex-col gap-2 p-5">
         <button
           onClick={() => {
             submitRead({ id: data.id });
           }}
           className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-200"
         >
           Baca
         </button>
         {data.statusRead ? (
           <button
             onClick={() => {
               changeStatus({ id: data.id });
             }}
             className=" px-3 py-2 text-sm font-medium text-center text-white bg-purple-400 rounded-lg hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-200"
           >
             Tandai belum dibaca
           </button>
         ) : (
           <button
             onClick={() => {
               changeStatus({ id: data.id });
             }}
             className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-200"
           >
             Tandai sudah dibaca
           </button>
         )}

         <button
           onClick={() => {
             deleteBookmark({ id: data.id });
           }}
           className=" px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-200"
         >
           Hapus dari bookmark
         </button>
       </div>
     </div>
      ) : (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <img
              className="rounded-t-lg object-cover w-full h-48"
              src={data.thumb}
              alt=""
            />
          </div>

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {data.title}
            </h5>
            <div>
              <p className="mb-3 font-normal text-gray-700">{data.desc}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-5">
            <button
              onClick={() => {
                submitRead({ id: data.id });
              }}
              className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Baca
            </button>
            {data.statusRead ? (
              <button
                onClick={() => {
                  changeStatus({ id: data.id });
                }}
                className=" px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300"
              >
                Tandai belum dibaca
              </button>
            ) : (
              <button
                onClick={() => {
                  changeStatus({ id: data.id });
                }}
                className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Tandai sudah dibaca
              </button>
            )}

            <button
              onClick={() => {
                deleteBookmark({ id: data.id });
              }}
              className=" px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Hapus dari bookmark
            </button>
          </div>
        </div>
      )}
    </>
  );
}
