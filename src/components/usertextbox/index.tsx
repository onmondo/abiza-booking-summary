import { SolarUserCircleLinear } from "../icons/usericon";
import styles from "./textbox.module.css";

export function UserTextBox() {
    return (
        <section className={styles.container}>
            <SolarUserCircleLinear />
            <input type="text" maxLength={50} placeholder="Guest's name"></input>
        </section>
    )
}