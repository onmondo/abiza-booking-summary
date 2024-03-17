import { useState } from "react";
import { SolarNotebookLinear } from "../icons/noteicon";
import styles from "./textbox.module.css";

type RemarksText = {
    value: string
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChange: (val: string) => void
    placeholder: string
}

export function TextBox({ value, onChange, placeholder }: RemarksText) {

    const [remark, setRemark] = useState("")
    const handleValueChange = (val: string) => {
        onChange(val)
        setRemark(val)
    }
    return (
        <section className={styles.container}>
            <SolarNotebookLinear />
            <input
                className={styles.guest}
                type="text" 
                value={(remark) ? remark : value}
                maxLength={50} 
                placeholder={placeholder}
                onChange={(e) => { handleValueChange(e.target.value) }}
            />
        </section>
    )
}