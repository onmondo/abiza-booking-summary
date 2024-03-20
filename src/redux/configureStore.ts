import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./ducks/bookings";

const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
    }
});

export default store;