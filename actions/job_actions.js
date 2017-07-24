import axios from 'axios'
import qs from 'qs'
import reverseGeocode from 'latlng-to-zip'
import {FETCH_JOBS} from './types'


// turn into url save query string using qs library (query string)
const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radios: 10,
    q: 'javascript'
};

//to take some location or zipcode from the action creator then formup into long URL
const buildJobsUrl = (zip) => {
    const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip});
    return `${JOB_ROOT_URL}${query}`
};

export const fetchJobs = (region) => async (dispatch) => {
    try {
        // Use to take an input latitude longitude and output is zipcode
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        let {data} = await axios.get(url);
        dispatch({type: FETCH_JOBS, payload: data});
    } catch (e) {
        console.error(e)
    }
};