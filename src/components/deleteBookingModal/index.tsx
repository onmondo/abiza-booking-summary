import { Button } from "../button";
import styles from "./deletebooking.module.css";

type RemoveRequest = {
    modalStatus: boolean
    onClick: () => void
    toggleForm: () => void
}

export function RemoveBooking({ modalStatus, onClick, toggleForm }: RemoveRequest) {
    return (
        <section className={`${styles.container} ${(modalStatus) ? `${styles.container} ${styles.show}` : `${styles.container} ${styles.hide}`}`}>
            <header>
                <h4>Delete Booking?</h4>
                <p></p>
            </header>
            <p className={styles.decide}>
                <Button onClick={onClick} name="This will remove the booking" isMain={true} />
                <Button onClick={(e) => { e.preventDefault(); toggleForm() }} name={"Cancel"} isMain={false} />
            </p>            
        </section>
    )
}