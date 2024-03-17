import { SolarNotebookLinear } from "../icons/noteicon";
import styles from "./textbox.module.css";

type RemarksText = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

export function TextBox({ value, onChange, placeholder }: RemarksText) {

    return (
        <section className={styles.container}>
            <SolarNotebookLinear />
            <input
                className={styles.guest}
                type="text" 
                value={value}
                maxLength={50} 
                placeholder={placeholder}
                onChange={onChange}
            />
        </section>
    )
}