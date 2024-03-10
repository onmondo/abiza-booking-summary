import { Dispatch, SetStateAction, useState } from "react";
import { RoomPicker, SelectOption } from "../RoomPicker";
import { UserTextBox } from "../UserTextBox";
import { BookingFrom } from "../bookingfrom";
import { DateTimePicker } from "../DateTimePicker";
import { CashTextBox } from "../cashtextbox";
import styles from "./bookingform.module.css"
import { Button } from "../button";
import axios from "axios";
import { TextBox } from "../textbox";
import moment from "moment";

type PaymentDetails = {
    paymentMode?: string
    amount?: string
    totalPayout?: string
}

type GuestDetails = {
    guestName?: string
    pax?: string
    stay?: string
}

export type ISODateText = {
    year?: string
    month?: string
    day?: string
}

type BookingFormProps = {
    toggleForm: Dispatch<SetStateAction<boolean>>
}

export function BookingForm({ toggleForm }: BookingFormProps) {
    const options: SelectOption[] = [
        { label: "Please select one...", value: "placeholder" },
        { label: "Room 1", value: "room1" },
        { label: "Room 2", value: "room2" },
        { label: "Attic", value: "attic" },
      ]

    const [roomPicked, setRoomPicked] = useState<SelectOption[]>([])
    const [newGuest, setNewGuest] = useState<GuestDetails>();
    const [bookedFrom, setBookedFrom] = useState<string>();
    const [checkedIn, setCheckedIn] = useState<ISODateText>();
    const [checkedOut, setCheckedOut] = useState<ISODateText>();
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>();
    const [datePaid, setDatePaid] = useState<ISODateText>();
    const [remarks, setRemarks] = useState<string>();

    const postNewBooking = async () => {
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings`;

        const formatCheckIn = moment(`${(checkedIn?.year) ? checkedIn?.year : moment().format("YYYY")}-${checkedIn?.month}-${checkedIn?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD");
        const formatChackOut = moment(`${(checkedOut?.year) ? checkedOut?.year : moment().format("YYYY")}-${checkedOut?.month}-${checkedOut?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD");
        const datePaidMonth = moment(`${(datePaid?.year) ? datePaid?.year : moment().format("YYYY")}-${datePaid?.month}-${datePaid?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD");
        const newBooking = {
            guestName: newGuest?.guestName,
            rooms: roomPicked.map(room => room.value),
            checkIn: formatCheckIn,
            checkOut: formatChackOut,
            noOfPax: parseInt(newGuest?.pax || "0"),
            noOfStay: parseInt(newGuest?.stay || "0"),
            nightlyPrice: parseFloat(paymentDetails?.amount || "0"),
            totalPayout: parseFloat(paymentDetails?.totalPayout || "0"),
            from: bookedFrom,
            modeOfPayment: paymentDetails?.paymentMode,
            datePaid: datePaidMonth,
            remarks: remarks,
        }

        console.log(newBooking);
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
            toggleForm(false);
        } catch (error) {
            const errorDetails = error as Error;
            console.log(errorDetails.message);
            // message.push(`Create order failed... [${errorDetails.message}]`)
            // setMessage(message);
        }

    }

    const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemarks(event.target.value);
        // setNewBooking({ ...newBooking, remarks: event.target.value})
    }

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        postNewBooking()
    }

    return (
        <form className={styles.container}>
            {/* <h1>{now.add({days: 1}).toString()}</h1> */}
            <UserTextBox onChange={val => {
                setNewGuest({...newGuest, ...val})
            }}
            />
            <br />
            <BookingFrom onChange={val => {
                setBookedFrom(val);
            }}/>
            <br />
            <DateTimePicker onChange={val => { 
                setCheckedIn({ ...checkedIn, ...val }) 
            }}/>
            <br />
            <DateTimePicker onChange={val => { 
                setCheckedOut({ ...checkedOut, ...val}) 
            }}/>
            <br />
            <CashTextBox onChange={val => {
                setPaymentDetails({ ...paymentDetails, ...val })
            }} />
            <br />
            <RoomPicker multiple={true} options={options} value={roomPicked} onChange={val => {
                const values = val as SelectOption[]
                setRoomPicked(values)
                }}/>
            <br />
            <DateTimePicker onChange={val => { 
                setDatePaid({ ...datePaid, ...val }) 
            }}/>
            <br />
            <TextBox onChange={handleRemarksChange} placeholder="Remarks . . ." />
            <br />
            <p className={styles.decide}>
                <Button onClick={handleOnClick} name={"Confirm to continue"} isMain={true} />
                <Button onClick={(e) => { e.preventDefault(); toggleForm(false) }} name={"Cancel"} isMain={false} />
            </p>
        </form>
    )
}