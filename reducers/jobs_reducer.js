import {FETCH_JOBS} from '../actions/types'

const INITIAL_STATE = {
    results: []
};

export default function (state = INITIAL_STATE, actions) {
    switch (actions.type) {
        case FETCH_JOBS:
            return actions.payload;
        default:
            return state
    }
}