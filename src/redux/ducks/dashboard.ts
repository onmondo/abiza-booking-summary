import { Action } from "./interface";

const ACKDEMODAL = "ackDemoModal";

export const ackDemoModal = () => ({
    type: ACKDEMODAL
})

const initialState = {
    forDemo: true
}

export default function dashboardReducer(state = initialState, action: Action<unknown>) {
    switch(action.type) {
        case ACKDEMODAL:
            return {
                ...state,
                forDemo: false
            }
        default:
            return state
    }
}