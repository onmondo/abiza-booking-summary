import { SolarDollarMinimalisticLinear } from "../cashicon";
import styles from "./textbox.module.css";

export function CashTextBox() {
    return (
        <section className={styles.container}>
            <SolarDollarMinimalisticLinear />
            <input className="paymentmode" type="text" placeholder="Cash, Bank, eWallet . . ."></input>
            <input className="amount" type="number" placeholder="0.00"></input>
        </section>
    )
}