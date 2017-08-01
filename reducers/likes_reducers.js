import _ from 'lodash'
import {REHYDRATE} from 'redux-persist/constants'
import {LIKE_JOB, CLEAR_LIKED_JOBS} from '../actions/types'

export default function (state = [], actions) {
    switch (actions.type) {
        case REHYDRATE:
            return actions.payload.likedJobs || [];
        case LIKE_JOB:
            // Handle, if user liking the jobs but the jobs existed on review screen, then the same jobs just show one
            return _.uniqBy([
                    actions.payload, ...state
                ],
                'jobkey'
            );
        case CLEAR_LIKED_JOBS:
            return [];
        default:
            return state
    }
}