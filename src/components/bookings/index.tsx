import axios from "axios";
import React, { useEffect, useState } from "react";
import { BookingRow } from "../bookingrow";
import styles from "./bookinglist.module.css";
import { RemoveBooking } from "../deleteBookingModal";

interface SearchBookingRequest {
    year: string
    month: string
    bookingFormStatus: boolean
    selectBooking(booking: BookingResponse): void
}

export type BookingResponse = {
    _id: string
    guestName: string
    from: string
    rooms: string[]
    checkIn: string
    checkOut: string
    datePaid: string
    nightlyPrice: number
    noOfPax: number
    noOfStay: number
    remarks: string
    modeOfPayment: string
    totalPayout: number
}

export function Bookings({ year, month, bookingFormStatus, selectBooking }: SearchBookingRequest) {
    const [bookings, setBookings] = useState<BookingResponse[]>([])
    const [bookingForDeletion, setBookingForDeletion] = useState<string>()
    const [showRemoveModal, setShowRemoveModal] = useState(false);
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
        } catch(error) {
            const errorDetails = error as Error;
            console.log(`Failed to fetch bookings for ${month} ${year}`, errorDetails.message)
        }
    }

    const removeBooking = async (bookingId: string | undefined) => {
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings/${year}/${month}/${bookingId}`;
        
        try {
            await axios.delete(apiUrl, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }
            });
            await fetchBookings();
        } catch(error) {
            const errorDetails = error as Error;
            console.log(`Failed to remove booking for ${month} ${year}`, errorDetails.message)
        }
    }

    // const handleDeleteBooking = (bookingId: string) => {
    //     removeBooking(bookingId);
    // }

    useEffect(() => {
        fetchBookings();
    }, [bookingFormStatus])

    return (
        <>
            <RemoveBooking 
                modalStatus={showRemoveModal}
                toggleForm={() => { setShowRemoveModal(!showRemoveModal) }} 
                onClick={() => { 
                    removeBooking(bookingForDeletion) 
                    setShowRemoveModal(!showRemoveModal)
                }} 
            />
            <ul className={styles.container}>
            {
                bookings.map(
                    booking => 
                    <li 
                        key={booking._id} 
                        // onClick={(e) => { 
                        //     e.preventDefault(); 
                        //     selectBooking(booking);
                        // }
                    // }
                    >
                        <BookingRow
                            removeBooking={(e) => { 
                                e.preventDefault();
                                setBookingForDeletion(booking._id) 
                                setShowRemoveModal(!showRemoveModal)
                            }}
                            updateBooking={(e) => { 
                                e.preventDefault(); 
                                selectBooking(booking);
                            }}
                            guestName={booking.guestName}
                            bookFrom={booking.from}
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
        </>

    )
}