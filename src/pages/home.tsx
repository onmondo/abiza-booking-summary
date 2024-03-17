import { useState } from "react";
import { BookingResponse, Bookings } from "../components/bookings";
import { Button } from "../components/button";
import "./styles/home.css";
import { BookingForm } from "../components/bookingformModal";

export function Home() {
    const [showNewBookingForm, setShowNewBookingForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState({});
    // Use context here for toggling the entry and modification form
    // console.log("showNewBookingForm", showNewBookingForm)

    function handleSelectBooking (booking: BookingResponse) {
        setSelectedBooking(booking);
        setShowNewBookingForm(!showNewBookingForm);
    }

    return (
        <main id="home">
            <section id="booking">
                <Bookings month="January" year="2024" bookingFormStatus={showNewBookingForm} selectBooking={handleSelectBooking} />
            </section>
            <section id="bookingform" className={`${(showNewBookingForm) ? "show" : "hide"}`}>
                <BookingForm booking={selectedBooking as BookingResponse} toggleForm={setShowNewBookingForm} />
            </section>
            <p id="addnewbooking">
                <Button 
                    name={"Add more"} 
                    isMain={true} 
                    onClick={() => { setShowNewBookingForm(!showNewBookingForm) }}
                />
            </p>
        </main>
    )
}