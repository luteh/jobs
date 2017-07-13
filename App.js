import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {TabNavigator} from 'react-navigation'
import AuthScreen from './Screens/AuthScreen'
import WelcomeScreen from './Screens/WelcomeScreen'

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class App extends React.Component {

    render() {
        const MainNavigator = TabNavigator({
                welcome: {screen: WelcomeScreen},
                auth: {screen: AuthScreen}
            },
            {
                //Issues tabnavigator doesnt have default width on android, must declare width value
                tabBarOptions: {
                    style: {
                        width: SCREEN_WIDTH
                    }
                }
            });
        return (
            <View style={styles.container}>
                <MainNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
