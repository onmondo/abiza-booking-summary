import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./ducks/bookings";
import bookingFormReducer from "./ducks/bookingForm";

const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        bookingForm: bookingFormReducer
    }
});

export default store;