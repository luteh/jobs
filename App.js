import React from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import AuthScreen from './Screens/AuthScreen'
import WelcomeScreen from './Screens/WelcomeScreen'
import ReviewScreen from './Screens/ReviewScreen'
import SettingsScreen from './Screens/SettingsScreen'
import {Provider} from 'react-redux'
import store from './store'

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class App extends React.Component {

    render() {
        const MainNavigator = TabNavigator({
                welcome: {screen: WelcomeScreen},
                auth: {screen: AuthScreen},
                review: {
                    screen: StackNavigator({
                        review: {screen: ReviewScreen},
                        settings: {screen: SettingsScreen}
                    })
                }
            },
            {
                ...Platform.select({
                    android: {
                        tabBarOptions: {
                            //Issues tabnavigator doesnt have default width on android, must declare width value
                            style: {
                                width: SCREEN_WIDTH
                            },
                        },
                        tabBarPosition: 'bottom'
                    },
                    ios: {
                        swipeEnabled: true
                    }
                })
            }
        );
        return (
            <Provider store={store}>
                <MainNavigator/>
            </Provider>
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
