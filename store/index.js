import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import {autoRehydrate, persistStore} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const store = createStore(
    reducers,
    {}
    ,
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )
);

/*
storage object = whenever redux states changes, store them into storage (AsyncStorage)
whitelist object = fetch particular reducer, in this case is 'likedJobs
*/

persistStore(store, {storage: AsyncStorage, whitelist: ['likedJobs']});

export default store