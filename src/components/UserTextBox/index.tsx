import { GuestDetails } from "../bookingformModal";
import { SolarUserCircleLinear } from "../icons/usericon";
import styles from "./textbox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setGuestName, setPax, setStay } from "../../redux/ducks/bookingForm";

type ChangeTextRequest = {
    value: GuestDetails
}

export function UserTextBox({ value }: ChangeTextRequest) {
    const guestName = useSelector<{ bookingForm: { guestName: string }}>((state) => state.bookingForm.guestName) as string;
    const noOfPax = useSelector<{ bookingForm: { noOfPax: number }}>((state) => state.bookingForm.noOfPax) as number;
    const noOfStay = useSelector<{ bookingForm: { noOfStay: number }}>((state) => state.bookingForm.noOfStay) as number;
    const dispatch = useDispatch();

    const handleChangeGuestName = (val: string) => {
        dispatch(setGuestName(val))
    }

    const handleChangePax = (val: string) => {
        dispatch(setPax(parseInt(val)))
    }
    
    const handleChangeStay = (val: string) => {
        dispatch(setStay(parseInt(val)))
    }

    return (
        <section className={styles.container}>
            <SolarUserCircleLinear />
            <input className={styles.guest}
                type="text" 
                value={(guestName) ? guestName : value.guestName}
                maxLength={50} 
                placeholder="Guest's name"
                onChange={(e) => { handleChangeGuestName(e.target.value) }}
            />
            <input 
                className={styles.pax}
                type="number" 
                value={(noOfPax) ? noOfPax : value.pax}
                // maxLength={50} 
                placeholder="Pax"
                onChange={(e) => { handleChangePax(e.target.value) }}
            />
            <input 
                className={styles.stay}
                type="number" 
                value={(noOfStay) ? noOfStay : value.stay}
                // maxLength={50} 
                placeholder="No. stay"
                onChange={(e) => { handleChangeStay(e.target.value) }}
            />
        </section>
    )
}