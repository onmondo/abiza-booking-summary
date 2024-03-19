import { useState } from "react";
import { BookingResponse, Bookings } from "../components/bookings";
import { Button } from "../components/button";
import "./styles/home.css";
import { BookingForm } from "../components/bookingformModal";

export function Home() {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState({});
    const [isNewBooking, setIsNewBooking] = useState(false);
    // Use context here for toggling the entry and modification form
    // console.log("showNewBookingForm", showNewBookingForm)

    function handleSelectBooking (booking: BookingResponse) {
        setIsNewBooking(false);
        setSelectedBooking(booking);
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
            <section id="bookingform" className={`${(showBookingForm) ? "show" : "hide"}`}>
                <BookingForm 
                    newBooking={isNewBooking}
                    isShown={(showBookingForm)} 
                    booking={selectedBooking as BookingResponse} 
                    toggleForm={setShowBookingForm}
                />
            </section>
            <p id="addnewbooking">
                <Button 
                    name={"Add more"} 
                    isMain={true} 
                    onClick={(e) => { 
                        e.preventDefault();
                        setShowBookingForm(!showBookingForm);
                        setIsNewBooking(true);
                        setSelectedBooking({});
                    }}
                />
            </p>
        </main>
    )
}