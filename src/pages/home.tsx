import { useState } from "react";
import { Bookings } from "../components/bookings";
import { Button } from "../components/button";
import "./styles/home.css";
import { BookingForm } from "../components/bookingform";

export function Home() {
    const [showNewBookingForm, setShowNewBookingForm] = useState(false);
    // Use context here for toggling the entry and modification form
    return (
        <main id="home">
            <section id="booking">
                <Bookings month="January" year="2024"/>
            </section>
            <section id="bookingform" className={`${(showNewBookingForm) ? "show" : "hide"}`}>
                <BookingForm toggleForm={setShowNewBookingForm} />
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