import { createSlice } from '@reduxjs/toolkit'
const bookmarkSlice = createSlice({
    name: 'news',
    initialState: {
        data: []
    },
    reducers: {
        fetchBookmarksSuccess(state, action) {
            state.data = action.payload
        }
    }
})

export const {fetchBookmarksSuccess} = bookmarkSlice.actions
export const bookmarksReducer = bookmarkSlice.reducer