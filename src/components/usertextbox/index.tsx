import { SolarUserCircleLinear } from "../icons/usericon";
import styles from "./textbox.module.css";

type UserText = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function UserTextBox({onChange }: UserText) {
    return (
        <section className={styles.container}>
            <SolarUserCircleLinear />
            <input 
                type="text" 
                maxLength={50} 
                placeholder="Guest's name"
                onChange={onChange}
            />
        </section>
    )
}