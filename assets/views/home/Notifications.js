import notifee from '@notifee/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { FontSize, Width } from "../../utils/Dimensions";
import { boldTextFont } from "../../utils/Style";
import Button from "../reuseable/Button";
import NotifService from './NotifService';
class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }
    async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();
    }
    componentWillUnmount() {
        this.messageListener();
        // this.notificationOpenedListener();
    }
    async checkPermission() {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("fcmToken", fcmToken)
        if (!fcmToken) {
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
    async requestPermission() {
        try {
            await messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    async createNotificationListeners() {
        this.messageListener = messaging().onMessage((message) => {
            console.log(message);
            const { title, body } = message.data;
            this.showAlert(title, body)
            this.displayNotification(title, body)
        });
    }
    async displayNotification(title, body) {
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            vibration: true,
        });
        await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId: channelId,
                vibrationPattern: [300, 500],
                sound: 'default',
            },
            ios: {
                channelId: channelId,
                vibrationPattern: [300, 500],
                sound: 'default',
            },
        });
    }
    showAlert(title, body) {
        Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    handleOnSend = async () => {
        this.notif.localNotif()
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFF" }} >
                <Button
                    title="PRESS ME"
                    titleStyle={{ ...boldTextFont, fontSize: FontSize(16) }}
                    onPress={() => this.handleOnSend()}
                    background={[styles.bottomButton]}
                />
            </View >
        )
    }

    onRegister(token) {
        this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif(notif) {
        Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        Alert.alert('Permissions', JSON.stringify(perms));
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn
    }
}
export default connect(mapStateToProps, null)(Notifications)
const styles = StyleSheet.create({
    bottomButton: {
        padding: Width(5), alignItems: "center",
        justifyContent: "center", backgroundColor: "red",
        paddingHorizontal: Width(10), borderRadius: 5
    }
});