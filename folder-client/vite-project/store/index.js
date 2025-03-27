import { configureStore } from "@reduxjs/toolkit"
import { counterReducer, incremented, decremented } from "./counterSlice.js"
import { newsReducer } from "./NewsSlice.js"
import { bookmarksReducer } from "./bookmarksSlice.js"

const store = configureStore({
    reducer: {
        counter: counterReducer,
        news: newsReducer,
        bookmarks: bookmarksReducer
    }
})

export default store

store.subscribe(() => console.log(store.getState()))

store.dispatch(incremented())
store.dispatch(incremented())
store.dispatch(decremented())