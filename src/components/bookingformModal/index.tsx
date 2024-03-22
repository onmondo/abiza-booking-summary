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
import { SolarNotebookLinear } from "../icons/noteicon";
import { useSelector, useDispatch } from "react-redux";
import { closeBookingForm } from "../../redux/ducks/bookings";
import { 
    setBookFrom, 
    setCheckIn, 
    setCheckOut, 
    setDatePaid, 
    setRemarks, 
    setRooms 
} from "../../redux/ducks/bookingForm";

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

export function BookingForm() {
    const selectedBooking = useSelector<{ bookings: { selectedBooking: BookingResponse }}>((state) => state.bookings.selectedBooking) as BookingResponse;
    const newBookingMode = useSelector<{ bookings: { newBookingMode: boolean }}>((state) => state.bookings.newBookingMode) as boolean;
    const guestName = useSelector<{ bookingForm: { guestName: string }}>((state) => state.bookingForm.guestName) as string;
    const noOfPax = useSelector<{ bookingForm: { noOfPax: number }}>((state) => state.bookingForm.noOfPax) as number;
    const noOfStay = useSelector<{ bookingForm: { noOfStay: number }}>((state) => state.bookingForm.noOfStay) as number;
    const checkIn = useSelector<{ bookingForm: { checkIn: string }}>((state) => state.bookingForm.checkIn) as string;
    const checkOut = useSelector<{ bookingForm: { checkOut: string }}>((state) => state.bookingForm.checkOut) as string;
    const datePaid = useSelector<{ bookingForm: { datePaid: string }}>((state) => state.bookingForm.datePaid) as string;
    const modeOfPayment = useSelector<{ bookingForm: { modeOfPayment: string }}>((state) => state.bookingForm.modeOfPayment) as string;
    const nightlyPrice = useSelector<{ bookingForm: { nightlyPrice: number }}>((state) => state.bookingForm.nightlyPrice) as number;
    const totalPayout = useSelector<{ bookingForm: { totalPayout: number }}>((state) => state.bookingForm.totalPayout) as number;
    const rooms = useSelector<{ bookingForm: { rooms: string[] }}>((state) => state.bookingForm.rooms) as string[];
    const from = useSelector<{ bookingForm: { from: string }}>((state) => state.bookingForm.from) as string;
    const remarks = useSelector<{ bookingForm: { remarks: string }}>((state) => state.bookingForm.remarks) as string;

    const options: SelectOption[] = [
        { label: "Please select one...", value: "placeholder" },
        { label: "room1", value: "room1" },
        { label: "room2", value: "room2" },
        { label: "attic", value: "attic" },
      ]

    const dispatch = useDispatch();
    const postNewBooking = async () => {
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings`;

        const newBookingRequestBuilder = new GuestBookingRequest.GuestBookingRequestBuilder();
        newBookingRequestBuilder.setGuestName(guestName);
        newBookingRequestBuilder.setRooms(rooms);
        newBookingRequestBuilder.setCheckIn(checkIn);
        newBookingRequestBuilder.setCheckout(checkOut);
        newBookingRequestBuilder.setNoOfPax(noOfPax);
        newBookingRequestBuilder.setNoOfStay(noOfStay);
        newBookingRequestBuilder.setNightlyPrice(nightlyPrice);
        newBookingRequestBuilder.setTotalPayout(totalPayout);
        newBookingRequestBuilder.setFrom(from);
        newBookingRequestBuilder.setModeOfPayment(modeOfPayment);
        newBookingRequestBuilder.setDatePaid(datePaid);
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
            dispatch(closeBookingForm())
        } catch (error) {
            const errorDetails = error as Error;
            console.log("Failed to create new booking record", errorDetails.message);
            // message.push(`Create order failed... [${errorDetails.message}]`)
        }

    }

    const updateBooking = async () => {
        const selectedYear = moment(checkIn).year()
        const selectedMonth = moment(checkIn).format("MMMM")
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings/${selectedYear}/${selectedMonth}/${selectedBooking._id}`

        const updateBookingRequestBuilder = new GuestBookingRequest.GuestBookingRequestBuilder();
        if(!isEmpty(guestName)) updateBookingRequestBuilder.setGuestName(guestName);
        if(!isEmpty(rooms)) updateBookingRequestBuilder.setRooms(rooms);
        if(!isEmpty(checkIn)) updateBookingRequestBuilder.setCheckIn(checkIn);
        if(!isEmpty(checkOut)) updateBookingRequestBuilder.setCheckout(checkOut);
        if(noOfPax > 0) updateBookingRequestBuilder.setNoOfPax(noOfPax);
        if(noOfStay > 0) updateBookingRequestBuilder.setNoOfStay(noOfStay);
        if(nightlyPrice > 0) { 
            if(selectedBooking.noOfPax) updateBookingRequestBuilder.setNoOfPax(selectedBooking.noOfPax);
            if(selectedBooking.noOfStay) updateBookingRequestBuilder.setNoOfStay(selectedBooking.noOfStay);
            if(selectedBooking.totalPayout) updateBookingRequestBuilder.setTotalPayout(selectedBooking.totalPayout);
            updateBookingRequestBuilder.setNightlyPrice(nightlyPrice)
        }
        if(totalPayout > 0) { 
            if(selectedBooking.noOfPax) updateBookingRequestBuilder.setNoOfPax(selectedBooking.noOfPax);
            if(selectedBooking.noOfStay) updateBookingRequestBuilder.setNoOfStay(selectedBooking.noOfStay);
            if(selectedBooking.nightlyPrice) updateBookingRequestBuilder.setNightlyPrice(selectedBooking.nightlyPrice);
            updateBookingRequestBuilder.setTotalPayout(totalPayout) 
        }
        if(!isEmpty(from)) updateBookingRequestBuilder.setFrom(from);
        if(!isEmpty(modeOfPayment)) updateBookingRequestBuilder.setModeOfPayment(modeOfPayment);
        if(!isEmpty(datePaid)) updateBookingRequestBuilder.setDatePaid(datePaid);
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
            dispatch(closeBookingForm());
        } catch (error) {
            const errorDetails = error as Error;
            console.log("Failed to create new booking record", errorDetails.message);
            // message.push(`Create order failed... [${errorDetails.message}]`)
            // setMessage(message);
        }
    }

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (newBookingMode) {
            postNewBooking()
        } else {
            updateBooking()
        }
    }

    function handleCloseForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        dispatch(closeBookingForm())
    }

    return (
        <form className={styles.container}>
            <UserTextBox 
                value={{
                    guestName: (isEmpty(guestName)) ? selectedBooking.guestName : guestName,
                    noOfPax: (selectedBooking.noOfPax) ? selectedBooking.noOfPax : noOfPax,
                    noOfStay: (selectedBooking.noOfPax) ? selectedBooking.noOfStay : noOfStay,
                }}
            />
            <br />
            <BookingFrom 
                value={(isEmpty(from)) ? selectedBooking.from : from}
                onChange={val => {
                    dispatch(setBookFrom(val));
                }}/>
            <br />
            <DateTimePicker 
                value={checkIn || selectedBooking.checkIn}
                onChange={val => { 
                    dispatch(setCheckIn(val as string))
                }}/>
            <br />
            <DateTimePicker 
                value={checkOut || selectedBooking.checkOut}
                onChange={val => { 
                    dispatch(setCheckOut(val as string))
                }}/>
            <br />
            <CashTextBox 
                value={{
                    paymentMode: selectedBooking.modeOfPayment || modeOfPayment,
                    amount: (selectedBooking.nightlyPrice) ? selectedBooking.nightlyPrice.toString() : nightlyPrice.toString(),
                    totalPayout: (selectedBooking.totalPayout) ? selectedBooking.totalPayout.toString() : totalPayout.toString(),
                }}
            />
            <br />
            <RoomPicker 
                multiple={true} 
                options={options} 
                value={
                    (isEmpty(rooms)) 
                        ? (isEmpty(selectedBooking.rooms))
                            ? [] 
                            : selectedBooking.rooms.map(room => ({ label: room, value: room }))
                        : rooms.map(room => ({ label: room, value: room })) 
                    }
                onChange={val => {
                    const values = val as SelectOption[]
                    const selectedRooms = values.map(value => value.value)
                    dispatch(setRooms(selectedRooms))
                }}/>
            <br />
            <DateTimePicker 
                value={datePaid || selectedBooking.datePaid}
                onChange={val => { 
                    dispatch(setDatePaid(val as string))
                }}/>
            <br />
            <TextBox 
                value={(isEmpty(remarks)) ? selectedBooking.remarks : remarks}
                onChange={val => {
                    // setRemarks(val)
                    dispatch(setRemarks(val))
                }} 
                placeholder="Remarks . . ." 
            >
                <SolarNotebookLinear />
            </TextBox>
            <br />
            <p className={styles.decide}>
                <Button onClick={handleOnClick} name={"Confirm to continue"} isMain={true} />
                <Button 
                    onClick={handleCloseForm} 
                    name={"Cancel"} 
                    isMain={false} 
                />
            </p>
        </form>
    )
}