import { createSlice } from '@reduxjs/toolkit'
const newsSlice = createSlice({
    name: 'news',
    initialState: {
        data: []
    },
    reducers: {
        fetchNewsSuccess(state, action) {
            state.data = action.payload
        }
    }
})

export const {fetchNewsSuccess} = newsSlice.actions
export const newsReducer = newsSlice.reducer