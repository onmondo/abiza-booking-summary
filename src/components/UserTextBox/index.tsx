import { useState } from "react";
import styles from "./textbox.module.css";
import { SolarUserCircleLinear } from "../icons/usericon";

type GuestUserName = {
    value: {
        guestName: string,
        noOfPax: number,
        noOfStay: number
    }
    onChange: (val: string, field: string) => void
}

export function UserTextBox({ value, onChange }: GuestUserName) {
    console.log(value)
    const [guestName, setGuestName] = useState("");
    const [pax, setPax] = useState("");
    const [stay, setStay] = useState("");
    function handleOnChangeBooking(val: string) {
        onChange(val, "guestName")
        setGuestName(val)
    }

    function handleChangePax(val: string) {
        onChange(val, "pax")
        setPax(val)
    }

    function handleChangeStay(val: string) {
        onChange(val, "stay")
        setStay(val)
    }

    return (
        <section className={styles.container}>
            <SolarUserCircleLinear />
            <input
                type="text"
                value={(value.guestName) ? value.guestName : guestName}
                maxLength={50} 
                placeholder="Guest name" 
                onChange={(e) => { handleOnChangeBooking(e.target.value) }}
            />
            <input 
                className={styles.pax}
                type="number" 
                value={(pax) ? pax : value.noOfPax}
                placeholder="Pax"
                min={1}
                max={4}
                step={1}
                onChange={(e) => { handleChangePax(e.target.value) }}
            />
            <input 
                className={styles.stay}
                type="number" 
                value={(stay) ? stay : value.noOfStay}
                placeholder="Stay"
                min={1}
                max={20}
                step={1}
                onChange={(e) => { handleChangeStay(e.target.value) }}
            />
        </section>
    )
}