import { SolarNotebookLinear } from "../icons/noteicon";
import styles from "./textbox.module.css";

type RemarksText = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

export function TextBox({ onChange, placeholder }: RemarksText) {

    return (
        <section className={styles.container}>
            <SolarNotebookLinear />
            <input className={styles.guest}
                type="text" 
                maxLength={50} 
                placeholder={placeholder}
                onChange={onChange}
            />
        </section>
    )
}