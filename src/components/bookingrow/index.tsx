
import moment from "moment";
import { SolarBedBroken } from "../icons/bedicon";
import { SolarSleepingLinear } from "../icons/bedpaxicon";
import { SolarDollarMinimalisticLinear } from "../icons/cashicon";
import { SolarCalendarDateLinear } from "../icons/datetimeicon";
import { SolarMoonSleepLinear } from "../icons/nightsicon";
import styles from "./row.module.css";
import Big from "big.js";
import { SolarClipboardRemoveLinear } from "../icons/removebookingicon";
import { SolarClipboardListOutline } from "../icons/updatebookingicon";

type BookingDetails = {
    guestName: string
    bookFrom: string,
    rooms: string[],
    checkin: string,
    checkout: string,
    pax: number,
    nights: number,
    payment: string,
    amount: string,
    remarks: string,
    totalAmount: string,
    removeBooking: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    updateBooking: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}
export function BookingRow({ 
        guestName, 
        bookFrom, 
        rooms, 
        checkin, 
        checkout,
        pax,
        nights,
        payment,
        amount,
        remarks,
        totalAmount,
        removeBooking,
        updateBooking
    }: BookingDetails) {
    const convertedCheckIn = moment(checkin).format("YYYY-MM-DD")
    const convertedCheckOut = moment(checkout).format("YYYY-MM-DD")
    const nightlyPrice = Big(amount).toFixed(2);
    const totalPayout = Big(totalAmount).toFixed(2);

    return (
        <article className={styles.container}>
            <ul className={styles.actions}>
                <li>
                <a 
                    href="#"
                    rel="Delete booking"
                    onClick={(e) => { removeBooking(e) }} 
                >
                        <SolarClipboardRemoveLinear />
                </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        rel="Update booking"
                        onClick={(e) => { updateBooking(e) }} 
                    >
                            <SolarClipboardListOutline />
                    </a>                    
                </li>
            </ul>
            <ul className={`${styles.list} ${styles.roomoccupied}`}>
                {rooms.map((room, i) => <li key={i}><SolarBedBroken /><small>{room}</small></li>)}
            </ul>
            <header className={styles.guestname}>
                <h4>{guestName}</h4>
                <small className={styles.from}>{bookFrom}</small>
            </header>
            <ul className={`${styles.list} ${styles.check}`}>
                <li>in<SolarCalendarDateLinear />{convertedCheckIn}</li>
                <li>out<SolarCalendarDateLinear />{convertedCheckOut}</li>
            </ul>
            <ul className={`${styles.list} ${styles.others}`}>
                <li>
                    <span><SolarSleepingLinear /></span>
                    <span>{pax}</span>
                    <span>Pax</span>
                    <span><SolarMoonSleepLinear /></span>
                    <span>{nights}</span>
                    <span>Night/s</span>
                </li>
                <li>
                    <span><SolarDollarMinimalisticLinear /></span>
                    <span>{payment}</span>
                    <span>{nightlyPrice}</span>
                    <strong>{totalPayout}</strong>
                </li>
            </ul>
            <section className={styles.remarks}>
                <blockquote>{remarks}</blockquote>
            </section>
        </article>
    )
}