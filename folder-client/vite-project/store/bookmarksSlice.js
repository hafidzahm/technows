import { createSlice } from "@reduxjs/toolkit";
import http from "../helper/http";
const bookmarkSlice = createSlice({
  name: "news",
  initialState: {
    data: [],
  },
  reducers: {
    fetchBookmarksSuccess(state, action) {
      state.data = action.payload;
    },
  },
});

export function getMyBookmark() {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("access_token");
      let response = await http.get("/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      await dispatch(fetchBookmarksSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export const { fetchBookmarksSuccess } = bookmarkSlice.actions;
export const bookmarksReducer = bookmarkSlice.reducer;
