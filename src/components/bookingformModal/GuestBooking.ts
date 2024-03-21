import moment from "moment"
import { GuestDetails } from "."
// import { SelectOption } from "../RoomPicker"

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
        private specs: unknown;

        constructor() {
            this.specs = {}
        }

        setGuestName(guestName: string): GuestBookingRequestBuilder {
            this.specs.guestName = guestName;
            return this;
        }

        setRooms(rooms: string[]): GuestBookingRequestBuilder {
            this.specs.rooms = rooms;
            return this;
        }

        setCheckIn(checkedIn: string): GuestBookingRequestBuilder {            
            this.specs.checkIn = (checkedIn) 
                // ? moment(`${(checkedIn?.year) ? checkedIn?.year : moment().format("YYYY")}-${checkedIn?.month}-${checkedIn?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                ? moment(checkedIn, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            return this;
        }
        setCheckout(checkedOut: string): GuestBookingRequestBuilder {
            this.specs.checkOut = (checkedOut) 
                // ? moment(`${(checkedOut?.year) ? checkedOut?.year : moment().format("YYYY")}-${checkedOut?.month}-${checkedOut?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                ? moment(checkedOut, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            return this;
        }
        setNoOfPax(noOfPax: number): GuestBookingRequestBuilder {
            this.specs.noOfPax = noOfPax;
            return this;
        }
        setNoOfStay(noOfStay: number): GuestBookingRequestBuilder {
            this.specs.noOfStay = noOfStay;
            return this;
        }
        setNightlyPrice(nightlyPrice: number): GuestBookingRequestBuilder {
            this.specs.nightlyPrice = nightlyPrice
            return this;
        }
        setTotalPayout(totalPayout: number): GuestBookingRequestBuilder {
            this.specs.totalPayout = totalPayout;
            return this;
        }
        setFrom(from: string): GuestBookingRequestBuilder {
            this.specs.from = from;
            return this;
        }
        setModeOfPayment(modeOfPayment: string): GuestBookingRequestBuilder {
            this.specs.modeOfPayment = modeOfPayment;
            return this;
        }
        setDatePaid(datePaid: string): GuestBookingRequestBuilder {
            this.specs.datePaid = (datePaid) 
                // ? moment(`${(datePaid?.year) ? datePaid?.year : moment().format("YYYY")}-${datePaid?.month}-${datePaid?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                ? moment(datePaid, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
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