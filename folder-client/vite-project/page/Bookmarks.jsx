import { useEffect } from "react";
import http from "../helper/http";
import CardBookmark from "../components/CardBookmark";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookmark } from "../store/bookmarksSlice";

export default function Bookmarks() {
  const dispatch = useDispatch();
  useEffect(() => {
    // getMyBookmark();
    dispatch(getMyBookmark());
  }, []);

  const data = useSelector(function (state) {
    return state.bookmarks.data;
  });

  // async function getMyBookmark() {
  //   try {
  //     let token = localStorage.getItem("access_token");
  //     let response = await http.get("/bookmarks", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response);
  //     dispatch(fetchBookmarksSuccess(response.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function changeStatus(body) {
    try {
      console.log(body);
      let { id } = body;
      let token = localStorage.getItem("access_token");
      let response = await http.put(
        `/bookmarks/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      dispatch(getMyBookmark());
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteBookmark(body) {
    try {
      let result = await Swal.fire({
        title: "Apakah anda yakin untuk menghapus bookmark ini?",
        showDenyButton: true,
        confirmButtonText: "Ya",
        denyButtonText: `Tidak`,
      });
      /* Read more about isConfirmed, isDenied below */
      console.log(result);
      if (result.isConfirmed) {
        let token = localStorage.getItem("access_token");
        let response = await http.delete(`/bookmarks/${body.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        dispatch(getMyBookmark());
        Swal.fire("Bookmark berhasil dihapus.", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Bookmark tidak jadi dihapus", "", "info");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl m-auto p-5 gap-5 ">
      {data.length > 0 ? (
        data.map((el) => {
          return (
            <CardBookmark
              key={el.id}
              data={el}
              changeStatus={changeStatus}
              deleteBookmark={deleteBookmark}
            />
          );
        })
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-gray-700">Bookmark Kosong</h1>
        </div>
      )}
    </div>
  );
}
