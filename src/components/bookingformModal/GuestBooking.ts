import moment from "moment"
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
            const specs = this.specs as GuestBooking;
            specs.guestName = guestName;
            this.specs = specs
            return this;
        }

        setRooms(rooms: string[]): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.rooms = rooms;
            this.specs = specs;
            return this;
        }

        setCheckIn(checkedIn: string): GuestBookingRequestBuilder {    
            const specs = this.specs as GuestBooking;        
            specs.checkIn = (checkedIn) 
                // ? moment(`${(checkedIn?.year) ? checkedIn?.year : moment().format("YYYY")}-${checkedIn?.month}-${checkedIn?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                ? moment(checkedIn, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            this.specs = specs;
            return this;
        }
        setCheckout(checkedOut: string): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.checkOut = (checkedOut) 
                // ? moment(`${(checkedOut?.year) ? checkedOut?.year : moment().format("YYYY")}-${checkedOut?.month}-${checkedOut?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                ? moment(checkedOut, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            this.specs = specs;
            return this;
        }
        setNoOfPax(noOfPax: number): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.noOfPax = noOfPax;
            this.specs = specs;
            console.log("specs", specs)
            return this;
        }
        setNoOfStay(noOfStay: number): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.noOfStay = noOfStay;
            this.specs = specs;
            return this;
        }
        setNightlyPrice(nightlyPrice: number): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.nightlyPrice = nightlyPrice
            this.specs = specs;
            return this;
        }
        setTotalPayout(totalPayout: number): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.totalPayout = totalPayout;
            this.specs = specs;
            return this;
        }
        setFrom(from: string): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.from = from;
            this.specs = specs;
            return this;
        }
        setModeOfPayment(modeOfPayment: string): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.modeOfPayment = modeOfPayment;
            this.specs = specs;
            return this;
        }
        setDatePaid(datePaid: string): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.datePaid = (datePaid) 
                // ? moment(`${(datePaid?.year) ? datePaid?.year : moment().format("YYYY")}-${datePaid?.month}-${datePaid?.day}`, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                ? moment(datePaid, 'YYYY-MMMM-DD').format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD");
            this.specs = specs;
            return this;
        }
        setRemarks(remarks: string): GuestBookingRequestBuilder {
            const specs = this.specs as GuestBooking;
            specs.remarks = remarks;
            this.specs = specs;
            return this;
        }
        
        build(): GuestBookingRequest {
            const specs = this.specs as GuestBooking;
            return new GuestBookingRequest(specs);
        }
    }
}