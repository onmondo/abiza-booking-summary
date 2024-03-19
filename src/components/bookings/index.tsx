import axios from "axios";
import { useEffect, useState } from "react";
import { BookingRow } from "../bookingrow";
import styles from "./bookinglist.module.css";
import { RemoveBooking } from "../deleteBookingModal";
import { Button } from "../button";
import { TextBox } from "../textbox";
// import { DateTimePicker } from "../DateTimePicker";

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

// type Pagination = {
//     page: number
//     limit: number
// }

export function Bookings({ year, month, bookingFormStatus, selectBooking }: SearchBookingRequest) {
    const defaultPage: number = 1;
    const defaultLimit: number = 10;
    const [bookings, setBookings] = useState<BookingResponse[]>([])
    const [bookingForDeletion, setBookingForDeletion] = useState<string>()
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [page, setPage] = useState(defaultPage);
    const [limit, setLimit] = useState(defaultLimit);
    const [totalBookings, setTotalBookings] = useState(0);
    const [activeNextButton, setActiveNextButton] = useState(true);
    const [activePrevButton, setActivePrevButton] = useState(false);

    const fetchBookings = async () => {
        const apiUrl = `${import.meta.env.VITE_ROOT_API}/bookings/${year}/${month}?sort=asc&page=${page}&limit=${limit}`
        
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }
            });
            const { data } = response;
            // const currentBookingCount = data.monthlyBookings.length;
            setActiveNextButton(!(data.monthlyBookings.data.length < defaultLimit))
            setTotalBookings(data.monthlyBookings.totalCount)
            setBookings(data.monthlyBookings.data)
            
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

    useEffect(() => {
        fetchBookings();
        setActivePrevButton(page !== 1);
        // console.log(totalBookings)
        // const totalRecords = bookings.length;
        // setTotalBookings(totalBookings + totalRecords);
    }, [bookingFormStatus, page])

    function handleLimitOnchange(val: string) {
        console.log(val)
        setLimit(10);
    }
    return (
        <section className={styles.container}>
            <RemoveBooking 
                modalStatus={showRemoveModal}
                toggleForm={() => { setShowRemoveModal(!showRemoveModal) }} 
                onClick={() => { 
                    removeBooking(bookingForDeletion) 
                    setShowRemoveModal(!showRemoveModal)
                }} 
            />
            <TextBox 
                value={limit.toString()} 
                onChange={handleLimitOnchange}
                placeholder="limit"
            >
            </TextBox>
            <ul className={styles.bookinglist}>
            {
                bookings.map(
                    booking => 
                    <li key={booking._id}>
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
            <p className={styles.pagination}>
                <Button 
                    name={"Previous"} 
                    isMain={false} 
                    onClick={(e) => {
                        e.preventDefault()
                        if (activePrevButton) {
                            setPage(page - 1)
                        }
                    }}
                />
                <strong>Total Record/s: {totalBookings}</strong>
                <Button 
                    name={"Next"} 
                    isMain={true} 
                    onClick={(e) => {
                        e.preventDefault()
                        if (activeNextButton) {
                            setPage(page + 1)
                        }
                    }}
                />
            </p>
        </section>

    )
}