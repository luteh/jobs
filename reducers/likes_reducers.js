import _ from 'lodash'
import {LIKE_JOB} from '../actions/types'

export default function (state = [], actions) {
    switch (actions.type) {
        case LIKE_JOB:
            // Handle, if user liking the jobs but the jobs existed on review screen, then the same jobs just show one
            return _.uniqBy([
                    actions.payload, ...state
                ],
                'jobkey'
            );
        default:
            return state
    }
}