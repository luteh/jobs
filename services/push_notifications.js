import {Permissions, Notifications} from 'expo'
import {AsyncStorage} from 'react-native'

export default async () => {
    let previousToken = await AsyncStorage.getItem('pushtoken');

    if (previousToken) {
        return;
    } else {
        // Asking the user for permissions to send request
        let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

        if (status !== 'granted') {
            return;
        }

        // Generate the token
        let token = await Notifications.getExponentPushTokenAsync()
    }
}