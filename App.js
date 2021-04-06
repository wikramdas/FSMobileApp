import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import store from "./assets/redux/Reducers";
import Signup from "./assets/views/auth/Signup";
import Home from './assets/views/home/TabView';
import SplashScreen from "./assets/views/SplashScreen";

const Stack = createStackNavigator();
export default class App extends Component {
    constructor() {
        super();
    }
    async componentDidMount() {
        if (!messaging().isAutoInitEnabled) {
            await messaging().registerDeviceForRemoteMessages();
        }
    }
    render() {
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false
                            }}
                            headerMode={"none"}
                        >
                            <Stack.Screen name={"Splash"} component={SplashScreen} />
                            <Stack.Screen name={"Signup"} component={Signup} />
                            <Stack.Screen name={"Home"} component={Home} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </Provider>
        )
    }
}