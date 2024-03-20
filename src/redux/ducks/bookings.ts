const NEXTPAGE = "nextpage";
const PREVPAGE = "prevpage";
const UPDATELIMIT =  "updatelimit";
const SETTOTALCOUNT = "setTotalCount";
const SETCURRENTCOUNT = "setCurrentCount";
const SETACTIVENEXT = "setActiveNext";
const SETACTIVEPREV = "setActivePrev";

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

const initialState = {
    page: 1,
    limit: 10,
    isNextButtonActive: true,
    isPrevButtonActive: false,
    totalCount: 0,
    currentCount: 10,
    totalPages: 1
}

interface Action<T>{
    type: string;
    value: T
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
        default:
            return state;
    }
}