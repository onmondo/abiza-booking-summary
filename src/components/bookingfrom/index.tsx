import { SolarClipboardHeartLinear } from "../icons/bookingicon";
import styles from "./textbox.module.css";

type BookingFromText = {
    onChange: (val: string) => void
}

export function BookingFrom({ onChange }: BookingFromText) {
    function handleOnChangeBooking(val: string) {
        onChange(val)
    }
    return (
        <section className={styles.container}>
            <SolarClipboardHeartLinear />
            <input
                type="text"
                maxLength={50} 
                placeholder="Agoda, walk-in . . ." 
                onChange={(e) => { handleOnChangeBooking(e.target.value) }}
            />
        </section>
    )
}