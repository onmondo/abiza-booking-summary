import { useState } from "react";
import { Bookings } from "../components/bookings";
import { useSelector } from "react-redux";
import "./styles/home.css";
import { BookingForm } from "../components/bookingformModal";

export function Home() {
    const isFormShown = useSelector<{ bookings: { isFormShown: boolean }}>((state) => state.bookings.isFormShown) as boolean;
    const [showBookingForm, setShowBookingForm] = useState(false);
    // const [selectedBooking, setSelectedBooking] = useState({});

    function handleSelectBooking () {
        // setSelectedBooking(booking);
        setShowBookingForm(!showBookingForm);
    }

    return (
        <main id="home">
            <section id="booking">
                <Bookings 
                    month="January" 
                    year="2024" 
                    bookingFormStatus={showBookingForm} 
                    selectBooking={handleSelectBooking} 
                />
            </section>
            <section id="bookingform" className={`${(isFormShown) ? "show" : "hide"}`}>
                <BookingForm />
            </section>
        </main>
    )
}
