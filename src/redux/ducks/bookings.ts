import { Action } from "./interface";

const NEXTPAGE = "nextpage";
const PREVPAGE = "prevpage";
const UPDATELIMIT =  "updatelimit";
const SETTOTALCOUNT = "setTotalCount";
const SETCURRENTCOUNT = "setCurrentCount";
const SETACTIVENEXT = "setActiveNext";
const SETACTIVEPREV = "setActivePrev";
export const ADDNEWBOOKING = "addNewBooking";
export const CLOSEBOOKINGFORM = "closeBookingForm";
export const UPDATEBOOKING = "updateBooking";
const SEARCHBOOKING = "searchBooking";

export const nextpage = () => ({
    type: NEXTPAGE
});

export const prevpage = () => ({
    type: PREVPAGE
});

export const updatelimit = (limit: number) => ({
    type: UPDATELIMIT,
    value: limit
})

export const setTotalCount = (totalCount: number) => ({
    type: SETTOTALCOUNT,
    value: totalCount
})

export const setCurrentCount = (currentCount: number) => ({
    type: SETCURRENTCOUNT,
    value: currentCount
})

export const setActiveNext = () => ({
    type: SETACTIVENEXT
})

export const setActivePrev = () => ({
    type: SETACTIVEPREV
})

export const addNewBooking = () => ({
    type: ADDNEWBOOKING
});

export const updateBooking = <T>(booking: T) => ({
    type: UPDATEBOOKING,
    value: booking
});

export const closeBookingForm = () => ({
    type: CLOSEBOOKINGFORM
});

export const searchBooking = (searchString: string) => ({
    type: SEARCHBOOKING,
    value: searchString
})

const initialState = {
    page: 1,
    limit: 10,
    isNextButtonActive: true,
    isPrevButtonActive: false,
    totalCount: 0,
    currentCount: 10,
    totalPages: 1,
    isFormShown: false,
    selectedBooking: {},
    newBookingMode: true,
    search: ""
}

export default function bookingsReducer(state = initialState, action: Action<unknown>) {
    switch(action.type) {
        case NEXTPAGE:
            return { 
                ...state, 
                page: state.page + 1, 
            };
        case PREVPAGE:
            return { 
                ...state, 
                page: state.page - 1,
            };
        case SETACTIVENEXT:
        case SETACTIVEPREV:
            return {
                ...state,
                isNextButtonActive: ((state.totalCount > (state.limit * state.page))),
                isPrevButtonActive: (state.page > 1)
            }
        case UPDATELIMIT:
            return { ...state, limit: action.value};
        case SETTOTALCOUNT:
            return { 
                ...state, 
                totalCount: action.value,
                totalPages: Math.ceil(parseInt(action.value as string) / state.limit)
            }
        case ADDNEWBOOKING:
            return {
                ...state,
                isFormShown: true,
                selectedBooking: {},
                newBookingMode: true
            }
        case UPDATEBOOKING:
            return {
                ...state,
                isFormShown: true,
                selectedBooking: action.value,
                newBookingMode: false
            }
        case CLOSEBOOKINGFORM:
            return {
                ...state,
                isFormShown: false,
                selectedBooking: {}
            }
        case SEARCHBOOKING: 
            return {
                ...state,
                search: action.value as string
            }
        default:
            return state;
    }
}