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
import { BookingResponse } from "../bookings";
import GuestBookingRequest from "./GuestBooking";
import { isEmpty } from "lodash";

export type PaymentDetails = {
    paymentMode?: string
    amount?: string
    totalPayout?: string
}

export type GuestDetails = {
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
    newBooking: boolean
    isShown: boolean
    booking: BookingResponse
    toggleForm: Dispatch<SetStateAction<boolean>>
}

export function BookingForm({ newBooking, isShown, toggleForm, booking }: BookingFormProps) {
    const options: SelectOption[] = [
        { label: "Please select one...", value: "placeholder" },
        { label: "room1", value: "room1" },
        { label: "room2", value: "room2" },
        { label: "attic", value: "attic" },
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

        const newBookingRequestBuilder = new GuestBookingRequest.GuestBookingRequestBuilder();
        newBookingRequestBuilder.setGuestName(newGuest as GuestDetails);
        newBookingRequestBuilder.setRooms(roomPicked);
        newBookingRequestBuilder.setCheckIn(checkedIn as ISODateText);
        newBookingRequestBuilder.setCheckout(checkedOut as ISODateText);
        newBookingRequestBuilder.setNoOfPax(newGuest as GuestDetails);
        newBookingRequestBuilder.setNoOfStay(newGuest as GuestDetails);
        newBookingRequestBuilder.setNightlyPrice(paymentDetails as PaymentDetails);
        newBookingRequestBuilder.setTotalPayout(paymentDetails as PaymentDetails);
        newBookingRequestBuilder.setFrom(bookedFrom as string);
        newBookingRequestBuilder.setModeOfPayment(paymentDetails as PaymentDetails);
        newBookingRequestBuilder.setDatePaid(datePaid as ISODateText);
        newBookingRequestBuilder.setRemarks(remarks as string);

        const newBookingRequest = newBookingRequestBuilder.build();
        try {
            await axios.post(apiUrl, newBookingRequest.getSpecs(), {
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
            console.log("Failed to create new booking record", errorDetails.message);
            // message.push(`Create order failed... [${errorDetails.message}]`)
            // setMessage(message);
        }

    }

    const updateBooking = async () => {
        const selectedYear = moment(booking.checkIn).year()
        const selectedMonth = moment(booking.checkIn).format("MMMM")
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings/${selectedYear}/${selectedMonth}/${booking._id}`

        const updateBookingRequestBuilder = new GuestBookingRequest.GuestBookingRequestBuilder();
        if(!isEmpty(newGuest)) updateBookingRequestBuilder.setGuestName(newGuest as GuestDetails);
        updateBookingRequestBuilder.setRooms(roomPicked);
        if(!isEmpty(checkedIn)) updateBookingRequestBuilder.setCheckIn(checkedIn as ISODateText);
        if(!isEmpty(checkedOut)) updateBookingRequestBuilder.setCheckout(checkedOut as ISODateText);
        if(!isEmpty(newGuest)) updateBookingRequestBuilder.setNoOfPax(newGuest as GuestDetails);
        if(!isEmpty(newGuest)) updateBookingRequestBuilder.setNoOfStay(newGuest as GuestDetails);
        if(!isEmpty(paymentDetails)) updateBookingRequestBuilder.setNightlyPrice(paymentDetails as PaymentDetails);
        if(!isEmpty(paymentDetails)) updateBookingRequestBuilder.setTotalPayout(paymentDetails as PaymentDetails);
        if(!isEmpty(bookedFrom)) updateBookingRequestBuilder.setFrom(bookedFrom as string);
        if(!isEmpty(paymentDetails)) updateBookingRequestBuilder.setModeOfPayment(paymentDetails as PaymentDetails);
        if(!isEmpty(datePaid)) updateBookingRequestBuilder.setDatePaid(datePaid as ISODateText);
        if(!isEmpty(remarks)) updateBookingRequestBuilder.setRemarks(remarks as string);

        const updateBookingRequest = updateBookingRequestBuilder.build();

        try {
            await axios.patch(apiUrl, updateBookingRequest.getSpecs(), {
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
            console.log("Failed to create new booking record", errorDetails.message);
            // message.push(`Create order failed... [${errorDetails.message}]`)
            // setMessage(message);
        }
    }

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (newBooking) {
            postNewBooking()
        } else {
            updateBooking()
        }
    }

    console.log("eval", isShown, newBooking, (isShown && !newBooking))
    return (
        <form className={styles.container}>
            {/* <h1>{now.add({days: 1}).toString()}</h1> */}
            <UserTextBox 
                value={(isShown && !newBooking) 
                    ? { 
                        guestName: booking.guestName,
                        stay: booking.noOfStay.toString(),
                        pax: booking.noOfPax.toString(),
                    }
                    : {                        
                        guestName: "",
                        stay: "",
                        pax: ""
                    }
                } 
                onChange={val => {
                    setNewGuest({...newGuest, ...val})
                }}
            />
            <br />
            <BookingFrom 
                value={(isShown && !newBooking) 
                    ? booking.from
                    : ""
                }
                onChange={val => {
                setBookedFrom(val);
            }}/>
            <br />
            <DateTimePicker 
                value={(isShown && !newBooking) 
                    ? {
                        month: booking.checkIn,
                        day: booking.checkIn,
                        year: booking.checkIn,
                    }
                    : {
                        month: "",
                        day: "",
                        year: ""
                    }
                }
                onChange={val => { 
                setCheckedIn({ ...checkedIn, ...val }) 
            }}/>
            <br />
            <DateTimePicker 
                value={(isShown && !newBooking) 
                    ? {
                        month: booking.checkOut,
                        day: booking.checkOut,
                        year: booking.checkOut,
                    }
                    : {
                        month: "",
                        day: "",
                        year: ""
                    }
                }
                onChange={val => { 
                setCheckedOut({ ...checkedOut, ...val}) 
            }}/>
            <br />
            <CashTextBox 
                value={(isShown && !newBooking) 
                    ? {
                        paymentMode: booking.modeOfPayment,
                        amount: booking.nightlyPrice.toString(),
                        totalPayout: booking.totalPayout.toString(),
                    }
                    : {
                        paymentMode: "",
                        amount: "",
                        totalPayout: "",
                    }
                }
                onChange={val => {
                setPaymentDetails({ ...paymentDetails, ...val })
            }} />
            <br />
            <RoomPicker 
                multiple={true} 
                options={options} 
                value={
                    (booking.rooms)
                    ? booking.rooms.map((room) => { 
                        return { 
                            label: room, value: room 
                        }
                    })
                    : roomPicked} 
                onChange={val => {
                    const values = val as SelectOption[]
                    setRoomPicked(values)
                }}/>
            <br />
            <DateTimePicker 
                value={(isShown && !newBooking) 
                    ? {
                        month: booking.datePaid,
                        day: booking.datePaid,
                        year: booking.datePaid,
                    }
                    : {
                        month: "",
                        day: "",
                        year: ""
                    }
                }
                onChange={val => { 
                setDatePaid({ ...datePaid, ...val }) 
            }}/>
            <br />
            <TextBox 
                value={(isShown && !newBooking) 
                    ? booking.remarks
                    : ""
                }
                onChange={val => {
                    setRemarks(val)
                }} 
                placeholder="Remarks . . ." 
            />
            <br />
            <p className={styles.decide}>
                <Button onClick={handleOnClick} name={"Confirm to continue"} isMain={true} />
                <Button 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        toggleForm(false);
                    }} 
                    name={"Cancel"} 
                    isMain={false} 
                />
            </p>
        </form>
    )
}