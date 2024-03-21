import { useState } from "react";
import { SolarClipboardHeartLinear } from "../icons/bookingicon";
import styles from "./textbox.module.css";

type BookingFromText = {
    value: string
    onChange: (val: string) => void
}

export function BookingFrom({ value, onChange }: BookingFromText) {
    const [bookingFrom, setBookingFrom] = useState("");
    function handleOnChangeBooking(val: string) {
        onChange(val)
        setBookingFrom(val)
    }
    return (
        <section className={styles.container}>
            <SolarClipboardHeartLinear />
            <input
                type="text"
                value={(value) ? value : bookingFrom}
                maxLength={50} 
                placeholder="Agoda, walk-in . . ." 
                onChange={(e) => { handleOnChangeBooking(e.target.value) }}
            />
        </section>
    )
}