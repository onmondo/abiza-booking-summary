import { Children, ReactNode, useState } from "react";
import styles from "./textbox.module.css";

type RemarksText = {
    value: string
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChange: (val: string) => void
    placeholder: string
    children?: ReactNode
}

export function TextBox({ value, onChange, placeholder, children }: RemarksText) {
    // const element: ReactNode = Children.only(children)
    const [remark, setRemark] = useState("")
    const handleValueChange = (val: string) => {
        onChange(val)
        setRemark(val)
    }
    return (
        <section className={styles.container}>
            {(children) ? Children.only(children) : ""}
            <input
                className={styles.guest}
                type="text" 
                value={(value) ? value : remark}
                maxLength={50} 
                placeholder={placeholder}
                onChange={(e) => { handleValueChange(e.target.value) }}
            />
        </section>
    )
}