import { SolarClipboardHeartLinear } from "../icons/bookingicon";
import styles from "./textbox.module.css";

type BookingFromText = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function BookingFrom({ onChange }: BookingFromText) {
    return (
        <section className={styles.container}>
            <SolarClipboardHeartLinear />
            <input
                type="text"
                maxLength={50} 
                placeholder="Agoda, walk-in . . ." 
                onChange={onChange}
            />
        </section>
    )
}