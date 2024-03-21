import { ADDNEWBOOKING, CLOSEBOOKINGFORM, UPDATEBOOKING } from "./bookings";
import { Action } from "./interface";

const SETGUESTNAME = "setGuestName";
const SETPAX = "setPax";
const SETSTAY = "setStay";
const SETBOOKFROM = "setBookFrom";
const SETCHECKIN = "setCheckIn";
const SETCHECKOUT = "setCheckOut";
const SETDATEPAID = "datePaid";
const SETROOMS = "setRooms";
const SETREMARKS = "setRemarks";
const SETPAYMENTMODE = "setPaymentMode";
const SETNIGHTLYPRICE = "setNightlyPrice";
const SETTOTALPAYOUT = "setTotalPayout";

export const setGuestName = (value: string) => ({
    type: SETGUESTNAME,
    value
});

export const setPax = (value: number) => ({
    type: SETPAX,
    value
});

export const setStay = (value: number) => ({
    type: SETSTAY,
    value
});

export const setBookFrom = (value: string) => ({
    type: SETBOOKFROM,
    value
});

export const setCheckIn = (value: string) => ({
    type: SETCHECKIN,
    value
});

export const setCheckOut = (value: string) => ({
    type: SETCHECKOUT,
    value
});

export const setDatePaid = (value: string) => ({
    type: SETDATEPAID,
    value
});

export const setRooms = (value: string[]) => ({
    type: SETROOMS,
    value
});

export const setRemarks = (value: string) => ({
    type: SETREMARKS,
    value
})

export const setPaymentMode = (value: string) => ({
    type: SETPAYMENTMODE,
    value
})

export const setNightlyPrice = (value: number) => ({
    type: SETNIGHTLYPRICE,
    value
})

export const setTotalPayout = (value: number) => ({
    type: SETTOTALPAYOUT,
    value
})

const initialState = {
    guestName: "",
    from: "",
    rooms: [],
    checkIn: undefined,
    checkOut: undefined,
    datePaid: undefined,
    nightlyPrice: 0,
    noOfPax: 0,
    noOfStay: 0,
    remarks: "",
    modeOfPayment: "",
    totalPayout: 0,
}

export default function bookingFormReducer(state = initialState, action: Action<unknown>) {
    switch(action.type) {
        case SETGUESTNAME:
            return {
                ...state,
                guestName: action.value
            }
        case SETPAX:
            return {
                ...state,
                noOfPax: action.value
            }
        case SETSTAY:
            return {
                ...state,
                noOfStay: action.value
            }
        case SETBOOKFROM:
            return {
                ...state,
                from: action.value
            }
        case SETCHECKIN:
            return {
                ...state,
                checkIn: action.value
            }
        case SETCHECKOUT:
            return {
                ...state,
                checkOut: action.value
            }
        case SETDATEPAID:
            return {
                ...state,
                datePaid: action.value
            }
        case SETPAYMENTMODE:
            return {
                ...state,
                modeOfPayment: action.value
            }
        case SETNIGHTLYPRICE: 
            return {
                ...state,
                nightlyPrice: action.value
            }
        case SETTOTALPAYOUT: 
            return {
                ...state,
                totalPayout: action.value
            }
        case SETROOMS: {
            return {
                ...state,
                rooms: action.value
            }
        }
        case SETREMARKS: {
            return {
                ...state,
                remarks: action.value
            }
        }
        case ADDNEWBOOKING:
        case UPDATEBOOKING: 
        case CLOSEBOOKINGFORM:
            return{
                ...state,
                guestName: "",
                from: "",
                rooms: [],
                checkIn: undefined,
                checkOut: undefined,
                datePaid: undefined,
                nightlyPrice: 0,
                noOfPax: 0,
                noOfStay: 0,
                remarks: "",
                modeOfPayment: "",
                totalPayout: 0,
            }
        default:
            return state;
    }
}