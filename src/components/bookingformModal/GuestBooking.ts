import moment from "moment"
import { GuestDetails, ISODateText, PaymentDetails } from "."
import { SelectOption } from "../RoomPicker"

interface GuestBooking {
    guestName: string //newGuest?.guestName,
    rooms: string[] //roomPicked.map(room => room.value),
    checkIn: string //formatCheckIn,
    checkOut: string //formatChackOut,
    noOfPax: number //parseInt(newGuest?.pax || "0"),
    noOfStay: number //parseInt(newGuest?.stay || "0"),
    nightlyPrice: number //parseFloat(paymentDetails?.amount || "0"),
    totalPayout: number //parseFloat(paymentDetails?.totalPayout || "0"),
    from: string //bookedFrom,
    modeOfPayment: string //paymentDetails?.paymentMode,
    datePaid: string //datePaidMonth,
    remarks: string //remarks,
}

export default class GuestBookingRequest {
    private specs: GuestBooking;

    protected constructor(specs: GuestBooking) {
        this.specs = specs
    }

    getSpecs() {
        return this.specs
    }

    static GuestBookingRequestBuilder = class GuestBookingRequestBuilder {
        private specs: GuestBooking;

        constructor() {
            this.specs = {
                guestName: "",
                rooms: [],
                checkIn: "",
                checkOut: "",
                noOfPax: 0,
                noOfStay: 0,
                nightlyPrice: 0,
                totalPayout: 0,
                from: "",
                modeOfPayment: "",
                datePaid: "",
                remarks: ""
            }
        }

        setGuestName(guest: GuestDetails): GuestBookingRequestBuilder {
            this.specs.guestName = guest.guestName as string;
            return this;
        }

        setRooms(rooms: SelectOption[]): GuestBookingRequestBuilder {
            this.specs.rooms = rooms.map(room => room.value);
            return this;
        }

        setCheckIn(checkedIn: ISODateText): GuestBookingRequestBuilder {            
            this.specs.checkIn = (checkedIn) 
                ? moment(`${(checkedIn?.year) ? checkedIn?.year : moment().format("YYYY")}-${checkedIn?.month}-${checkedIn?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            return this;
        }
        setCheckout(checkedOut: ISODateText): GuestBookingRequestBuilder {
            this.specs.checkOut = (checkedOut) 
                ? moment(`${(checkedOut?.year) ? checkedOut?.year : moment().format("YYYY")}-${checkedOut?.month}-${checkedOut?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            return this;
        }
        setNoOfPax(guest: GuestDetails): GuestBookingRequestBuilder {
            this.specs.noOfPax = parseInt(guest?.pax || "0");
            return this;
        }
        setNoOfStay(guest: GuestDetails): GuestBookingRequestBuilder {
            this.specs.noOfStay = parseInt(guest?.stay || "0");
            return this;
        }
        setNightlyPrice(paymentDetails: PaymentDetails): GuestBookingRequestBuilder {
            this.specs.nightlyPrice = parseFloat(paymentDetails?.amount || "0");
            return this;
        }
        setTotalPayout(paymentDetails: PaymentDetails): GuestBookingRequestBuilder {
            this.specs.totalPayout = parseFloat(paymentDetails?.totalPayout || "0");
            return this;
        }
        setFrom(from: string): GuestBookingRequestBuilder {
            this.specs.from = from;
            return this;
        }
        setModeOfPayment(paymentDetails: PaymentDetails): GuestBookingRequestBuilder {
            this.specs.modeOfPayment = paymentDetails?.paymentMode as string;
            return this;
        }
        setDatePaid(datePaid: ISODateText): GuestBookingRequestBuilder {
            this.specs.datePaid = (datePaid) 
                ? moment(`${(datePaid?.year) ? datePaid?.year : moment().format("YYYY")}-${datePaid?.month}-${datePaid?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            return this;
        }
        setRemarks(remarks: string): GuestBookingRequestBuilder {
            this.specs.remarks = remarks;
            return this;
        }
        
        build(): GuestBookingRequest {
            return new GuestBookingRequest(this.specs);
        }
    }
}