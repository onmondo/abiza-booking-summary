import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./ducks/bookings";
import bookingFormReducer from "./ducks/bookingForm";
import dashboardReducer from "./ducks/dashboard";

const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        bookingForm: bookingFormReducer,
        dashboard: dashboardReducer
    }
});

export default store;