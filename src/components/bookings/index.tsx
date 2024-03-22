import axios from "axios";
import { useEffect, useState } from "react";
import { BookingRow } from "../bookingrow";
import styles from "./bookinglist.module.css";
import { TinyModal } from "../tinyModal";
import { Button } from "../button";
import { TextBox } from "../textbox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewBooking, nextpage, prevpage, searchBooking, setActiveNext, setActivePrev, setTotalCount, updateBooking, updatelimit } from "../../redux/ducks/bookings";
// import { isEmpty } from "lodash";
import { SolarCardSearchLinear } from "../icons/searchicon";
import { ackDemoModal } from "../../redux/ducks/dashboard";
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
    const forDemo = useSelector<{ dashboard: { forDemo: boolean }}>((state) => state.dashboard.forDemo) as boolean;
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
            <div className={styles.modals}>
                <TinyModal 
                    label={"Delete Booking?"}
                    defaultButton={{ isMain: false, label: "Cancel" }}
                    modalStatus={showRemoveModal}
                    toggleForm={() => { setShowRemoveModal(!showRemoveModal) }} 
                >
                    <Button 
                        onClick={() => { 
                            removeBooking(bookingForDeletion) 
                            setShowRemoveModal(!showRemoveModal)
                        }} 
                        name="This will remove the booking" isMain={true} 
                    />
                </TinyModal>
            </div>
            <div className={styles.modals}>
                <TinyModal 
                    label={`Demo Notice`}
                    description={`Thank you for visiting our app! Please note that this is a demonstration version intended for showcasing purposes only.
                    
                    To conserve resources and manage costs, the server powering this app may spin down during periods of inactivity. As a result, you may experience delays in response times, lasting approximately 50 seconds, when accessing certain features.
                    
                    We appreciate your understanding and patience. If you encounter any issues or have suggestions for improvement, please feel free to reach out to us. Your feedback helps us enhance the user experience.
                    
                    Thank you for your interest and enjoy exploring our demo!`}
                    defaultButton={{ isMain: true, label: "Proceed?" }}
                    modalStatus={forDemo}
                    toggleForm={() => { dispatch(ackDemoModal()) }} 
                />
            </div>
            <TextBox 
                value={""}
                onChange={val => {
                    // setRemarks(val)
                    dispatch(searchBooking(val))
                }} 
                placeholder="Search . . ." 
            >
                <SolarCardSearchLinear />
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