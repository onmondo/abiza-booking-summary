// import { useState } from "react";
import styles from "./textbox.module.css";
import { SolarUserCircleLinear } from "../icons/usericon";
import { useSelector, useDispatch } from "react-redux";
import { setGuestName, setPax, setStay } from "../../redux/ducks/bookingForm";

type GuestUserName = {
    value: {
        guestName: string,
        noOfPax: number,
        noOfStay: number
    }
    // onChange: (val: string, field: string) => void
}

export function UserTextBox({ value }: GuestUserName) {
    // const [guestName, setGuestName] = useState("");
    // const [pax, setPax] = useState("");
    // const [stay, setStay] = useState("");
    const guestName = useSelector<{ bookingForm: { guestName: string }}>((state) => state.bookingForm.guestName) as string;
    const noOfPax = useSelector<{ bookingForm: { noOfPax: number }}>((state) => state.bookingForm.noOfPax) as number;
    const noOfStay = useSelector<{ bookingForm: { noOfStay: number }}>((state) => state.bookingForm.noOfStay) as number;

    const dispatch = useDispatch();
    function handleOnChangeBooking(val: string) {
        // onChange(val, "guestName")
        setGuestName(val)
    }

    function handleChangePax(val: string) {
        // onChange(val, "pax")
        // setPax(val)
        dispatch(setPax(parseInt(val)))
    }

    function handleChangeStay(val: string) {
        // onChange(val, "stay")
        dispatch(setStay(parseInt(val)));
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
                value={(noOfPax) ? noOfPax : value.noOfPax}
                placeholder="Pax"
                min={1}
                max={4}
                step={1}
                onChange={(e) => { handleChangePax(e.target.value) }}
            />
            <input 
                className={styles.stay}
                type="number" 
                value={(noOfStay) ? noOfStay : value.noOfStay}
                placeholder="Stay"
                min={1}
                max={20}
                step={1}
                onChange={(e) => { handleChangeStay(e.target.value) }}
            />
        </section>
    )
}