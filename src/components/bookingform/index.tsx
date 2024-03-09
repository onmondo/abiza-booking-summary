import { useState } from "react";
import { RoomPicker, SelectOption } from "../RoomPicker";
import { UserTextBox } from "../usertextbox";
import { BookingFrom } from "../bookingfrom";
import { DateTimePicker } from "../DateTimePicker";
import { CashTextBox } from "../cashtextbox";
import styles from "./bookingform.module.css"
import { Button } from "../button";
import axios from "axios";

type NewBooking = {
    guestName: string,
    bookFrom: string,
    rooms: string[],
    checkIn: string,
    checkOut: string,
    noOfPax: number,
    noOfStay: number,
    nightlyPrice: number,
    totalPayout: number,
    from: string,
    modeOfPayment: string,
    datePaid: string,
    remarks: string,
}
export function BookingForm() {
    const options: SelectOption[] = [
        { label: "Please select one...", value: "placeholder" },
        { label: "Room 1", value: "room1" },
        { label: "Room 2", value: "room2" },
        { label: "Attic", value: "attic" },
      ]

    const [values, setValues] = useState<SelectOption[]>([])
    const [newBooking, setNewBooking] = useState<NewBooking>()

    const postNewBooking = async () => {
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings`;
        console.log("newBooking", newBooking);
        try {
            await axios.post(apiUrl, newBooking, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${accessToken}`
                }
            })
            // message.push("Successfully created a new order!")
            // setMessage(message);
            // setNewBooking(addedNewOrder);
        } catch (error) {
            const errorDetails = error as Error;
            console.log(errorDetails.message);
            // message.push(`Create order failed... [${errorDetails.message}]`)
            // setMessage(message);
        }

    }
    const handleOnChangeGuest = (event: React.ChangeEvent<HTMLInputElement>) => {
        // apply builder pattern Headers[Symbol]..
        const constructNewBooking: NewBooking = { ...newBooking, guestName: event.target.value }
        console.log(constructNewBooking)
        setNewBooking(constructNewBooking);
    }

    const handleOnChangeFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const constructNewBooking: NewBooking = { ...newBooking, bookFrom: event.target.value }
        console.log(constructNewBooking)
        setNewBooking(constructNewBooking);
    }

    const handleOnClick = () => {
        postNewBooking()
    }

    return (
        <form className={styles.container}>
            {/* <h1>{now.add({days: 1}).toString()}</h1> */}
            <UserTextBox onChange={handleOnChangeGuest} />
            <br />
            <BookingFrom onChange={handleOnChangeFrom}/>
            <br />
            <DateTimePicker />
            <br />
            <DateTimePicker />
            <br />
            <CashTextBox />
            <br />
            {/* <Select value={customvalue} options={options} onChange={val => {
                const values = val as SelectOption
                setCustomValue(values)
                }}/>
            <br /> */}
            <RoomPicker multiple={true} options={options} value={values} onChange={val => {
                const values = val as SelectOption[]
                setValues(values)
                }}/>
                <br />
            <Button onClick={handleOnClick} name={"Confirm to continue"} isMain={true} />
        </form>
    )
}