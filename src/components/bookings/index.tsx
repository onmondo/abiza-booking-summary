import axios from "axios";
import { useEffect, useState } from "react";
import { BookingRow } from "../bookingrow";
import styles from "./bookinglist.module.css";
import { RemoveBooking } from "../deleteBookingModal";
import { Button } from "../button";
import { TextBox } from "../textbox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewBooking, nextpage, prevpage, setActiveNext, setActivePrev, setTotalCount, updateBooking, updatelimit } from "../../redux/ducks/bookings";
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

export function Bookings({ year, month }: SearchBookingRequest) {
    const page = useSelector<{ bookings: { page: number }}>((state) => state.bookings.page) as number;
    const totalPages = useSelector<{ bookings: { totalPages: number }}>((state) => state.bookings.totalPages) as number;
    const limit = useSelector<{ bookings: { limit: number }}>((state) => state.bookings.limit) as number;
    const totalBookings = useSelector<{ bookings: { totalCount: number }}>((state) => state.bookings.totalCount) as number;
    const isNextButtonActive = useSelector<{ bookings: { isNextButtonActive: boolean }}>((state) => state.bookings.isNextButtonActive) as boolean;
    const isPrevButtonActive = useSelector<{ bookings: { isPrevButtonActive: boolean }}>((state) => state.bookings.isPrevButtonActive) as boolean;
    const isFormShown = useSelector<{ bookings: { isFormShown: boolean }}>((state) => state.bookings.isFormShown) as boolean;
    const dispatch = useDispatch();

    const [bookings, setBookings] = useState<BookingResponse[]>([])
    const [bookingForDeletion, setBookingForDeletion] = useState<string>()
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    // const [activeNextButton, setActiveNextButton] = useState(true);
    // const [activePrevButton, setActivePrevButton] = useState(false);

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
            // setActiveNextButton(!(data.monthlyBookings.data.length < defaultLimit))
            // setTotalBookings(data.monthlyBookings.totalCount)
            dispatch(setTotalCount(data.monthlyBookings.totalCount));
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
        // setActivePrevButton(page !== 1);
        // const totalRecords = bookings.length;
    }, [isFormShown, page, limit])

    function handleLimitOnchange(val: string) {
        dispatch(updatelimit(parseInt(val)))
    }

    function handleNextPage() {
        if (isNextButtonActive) {
            dispatch(nextpage());
            dispatch(setActiveNext());
        }
    }

    function handlePrevPage() {
        if (isPrevButtonActive) {
            dispatch(prevpage())
            dispatch(setActivePrev());
        }
    }

    function handleAddNewBooking(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        dispatch(addNewBooking())
    }

    function handleEditBooking(booking: BookingResponse) {
        dispatch(updateBooking(booking))
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
                            updateBooking={() => {
                                handleEditBooking(booking)
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
            <section className={styles.pagination}>
                <Button 
                    name={"Previous"} 
                    isMain={false} 
                    onClick={handlePrevPage}
                />
                <label>Limit</label>
                <TextBox 
                    value={limit.toString()} 
                    onChange={handleLimitOnchange}
                    placeholder="limit"
                >
                </TextBox>
                <em>{page}/{totalPages}</em>
                <em>Total Record/s: {totalBookings}</em>
                <Button 
                    name={"Next"} 
                    isMain={true} 
                    onClick={handleNextPage}
                />
                <Button 
                    name={"Add more"} 
                    isMain={true} 
                    onClick={handleAddNewBooking}
                />
            </section>
        </section>

    )
}