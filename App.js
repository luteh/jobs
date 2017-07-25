import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import AuthScreen from './Screens/AuthScreen'
import WelcomeScreen from './Screens/WelcomeScreen'
import ReviewScreen from './Screens/ReviewScreen'
import SettingsScreen from './Screens/SettingsScreen'
import MapScreen from './Screens/MapScreen'
import DeckScreen from './Screens/DeckScreen'
import {Provider} from 'react-redux'
import store from './store'

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class App extends React.Component {

    render() {
        const MainNavigator = TabNavigator({
                welcome: {screen: WelcomeScreen},
                auth: {screen: AuthScreen},
                main: {
                    screen: TabNavigator({
                            map: {screen: MapScreen},
                            deck: {screen: DeckScreen},
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
                                    tabBarPosition: 'bottom',
                                    swipeEnabled: false
                                }
                            })
                        }),
                },

            },
            {
                // lazy property, to render one by one tab navigator screen when the screen is opened
                lazy: true,
                navigationOptions: {
                    tabBarVisible: false
                },
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
