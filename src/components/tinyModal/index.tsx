import { Children, ReactNode } from "react";
import { Button } from "../button";
import styles from "./tinymodal.module.css";

type RemoveRequest = {
    label: string
    modalStatus: boolean
    toggleForm: () => void
    children?: ReactNode
    defaultButton: { isMain: boolean, label: string }
    description?: string
}

export function TinyModal({ label, modalStatus, toggleForm, children, defaultButton, description }: RemoveRequest) {
    return (
        <section className={`${styles.container} ${(modalStatus) ? `${styles.container} ${styles.show}` : `${styles.container} ${styles.hide}`}`}>
            <header>
                <h4>{label}</h4>
                <article>
                {description}
                </article>
            </header>
            <p className={styles.decide}>
                {(children) ? Children.only(children) : ""}
                <Button onClick={(e) => { e.preventDefault(); toggleForm() }} name={defaultButton.label} isMain={defaultButton.isMain} />
            </p>            
        </section>
    )
}