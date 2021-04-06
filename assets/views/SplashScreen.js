import React from 'react';
import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from "react-redux";
import UserFSHandler from '../data/firebase/UserFSHandler';
import { FontSize, Height, Width } from '../utils/Dimensions';
import { textFont } from '../utils/Style';
import MyUtils from '../utils/Utils';
const UFSHandler = new UserFSHandler()
const DELAY_SECONDS = 1000
class SplashScreen extends React.Component {
    async componentDidMount() {
        UFSHandler.onAuthStateChanged(isLoggedIn => {
            if (isLoggedIn === null) {
                this.startAfterDelay(DELAY_SECONDS, "Signup")
            } else {
                this.startAfterDelay(DELAY_SECONDS, "Home")
            }
        })
    }
    startAfterDelay(delay, routeName) {
        setTimeout(() => {
            MyUtils.resetStackNavigator(this.props.navigation, routeName)
        }, delay)
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: Height(10) }}>
                <Text style={{
                    ...textFont, fontSize: FontSize(20),
                    marginVertical: Height(5)
                }}>Splash Screen</Text>
                <Progress.Bar
                    progress={0.3}
                    width={Width(30)}
                    indeterminate={true}
                    indeterminateAnimationDuration={2000}
                    color={"#000"}
                    borderWidth={.2}
                    height={1}
                />
            </View>
        )
    }
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn,
        isEmailVerified: state.reducer.isEmailVerified,
    }
}
export default connect(mapStateToProps, null)(SplashScreen)