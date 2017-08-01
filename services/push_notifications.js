import {Permissions, Notifications} from 'expo'
import {AsyncStorage} from 'react-native'
import axios from 'axios'

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let previousToken = await AsyncStorage.getItem('pushtoken');
    console.log(previousToken);

    if (previousToken) {
        return;
    } else {
        // Asking the user for permissions to send request
        let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

        if (status !== 'granted') {
            return;
        }

        // Generate the token
        let token = await Notifications.getExponentPushTokenAsync();
        await axios.post(PUSH_ENDPOINT, {token: {token}});
        AsyncStorage.setItem('pushtoken', token)
    }
}