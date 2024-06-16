import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './UserSlice'
import { pollReducer } from './PollSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        poll: pollReducer
    }
})


export default store;
