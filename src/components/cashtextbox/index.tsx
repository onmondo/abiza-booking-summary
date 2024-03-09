import { SolarDollarMinimalisticLinear } from "../cashicon";
import styles from "./textbox.module.css";

export function CashTextBox() {
    return (
        <section className={styles.container}>
            <SolarDollarMinimalisticLinear />
            <input type="number" placeholder="953.00"></input>
        </section>
    )
}