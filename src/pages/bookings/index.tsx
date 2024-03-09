import axios from "axios";
import { useEffect, useState } from "react";
import { BookingRow } from "../../components/bookingrow";
import styles from "./bookinglist.module.css";

type SearchBookingRequest = {
    year: string,
    month: string,
}

type BookingResponse = {
    _id: string,
    guestName: string,
    bookFrom: string,
    rooms: string[],
    checkIn: string,
    checkOut: string,
    datePaid: string,
    nightlyPrice: number,
    noOfPax: number,
    noOfStay: number,
    remarks: string,
    modeOfPayment: string,
    totalPayout: number,
}

export function Bookings({ year, month }: SearchBookingRequest) {
    const [bookings, setBookings] = useState<BookingResponse[]>([])
    const fetchBookings = async () => {
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings/${year}/${month}?sort=asc`;
        
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }
            });
            const { data } = response;
            setBookings(data.monthlyBookings)
            console.log("response", data.monthlyBookings);
        } catch(error) {
            const errorDetails = error as Error;
            console.log(errorDetails.message)
        }
    }

    useEffect(() => {
        fetchBookings();
    }, [])

    return (
        <ul className={styles.container}>
    
        {
            bookings.map(
                booking => 
                <li key={booking._id}>
                    <BookingRow 
                        guestName={booking.guestName}
                        bookFrom={booking.bookFrom}
                        rooms={booking.rooms}
                        checkin={booking.checkIn}
                        checkout={booking.checkOut}
                        pax={booking.noOfPax}
                        nights={booking.noOfStay}
                        payment={booking.modeOfPayment}
                        amount={booking.nightlyPrice.toString()}
                        totalAmount={booking.totalPayout.toString()}
                        remarks={booking.remarks}
                    /> 
                </li>
            )
        }
            
        </ul>
    )
}