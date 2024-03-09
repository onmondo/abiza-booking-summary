import { SolarClipboardHeartLinear } from "../icons/bookingicon";
import styles from "./textbox.module.css";

export function BookingFrom() {
    return (
        <section className={styles.container}>
            <SolarClipboardHeartLinear />
            <input type="text" maxLength={50} placeholder="Agoda, walk-in . . ."></input>
        </section>
    )
}