import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Alert, Linking } from 'react-native';
import Snackbarr from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import { secondryColor, EmptyState, Buttonstyle, textFont, primaryColor, borderColor, defaultFont } from './Style'
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import AppConfig from './AppConfig';
import { Width, Height, FontSize } from './Dimensions';

export default {
    showSnackbar(message, background, color) {
        Snackbarr.show({
            text: message,
            fontFamily: defaultFont,
            backgroundColor: background ? background : secondryColor,
            textColor: color ? color : 'white',
            action: {
                text: 'Ok',
            },
        });
    },

    showMessagePopup(title, message) {
        setTimeout(() => {
            Alert.alert(title, message,
                [{ text: "Okay", style: "cancel" }],
                { cancelable: true })
        }, 500)
    },

    isEmptyarray(array) {
        if (array == undefined || array == "" || array.length == 0) {
            return true
        } else {
            return false
        }
    },

    isEmptyString(str) {
        return (str == "" || !str)
    },

    renderEmptyState(FnText, subText, image, onAction) {
        return (
            <View style={EmptyState.cover}>
                <Image
                    style={EmptyState.image}
                    resizeMode="stretch"
                    source={image ? image : require('../images/empty/empty-request.png')}
                />
                <Text style={EmptyState.headText}>{FnText}</Text>
                <Text style={EmptyState.text}>{subText}</Text>
                {onAction &&
                    <TouchableOpacity activeOpacity={0.9} style={[Buttonstyle.buttonContainer, { width: 200 }]} onPress={() => onAction()}>
                        <Text style={Buttonstyle.buttonText}>Retry</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    },

    renderCircledImage(imgPath, width, height) {
        return <TouchableOpacity activeOpacity={.8}
            style={{
                overflow: 'hidden',
                height: height,
                width: width,
                borderRadius: Width(50),
            }}>
            <Image
                style={{
                    height: height,
                    width: width,
                    borderRadius: Width(50),
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderWidth: .5,
                    borderColor: borderColor
                }}
                source={imgPath}
            />
        </TouchableOpacity>
    },

    renderLoadingState(size) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={size ? size : 'large'} color={secondryColor} />
            </View>
        )
    },
    getRandomcolor() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgba(" + x + "," + y + "," + z + ",0.2)";
        return bgColor
    },

    isValidMobile(num) {
        var isvalid = false
        if (num != undefined && num != null && num != "" && !isNaN(num)) {
            if (num.startsWith("0") && num.length == 11) {
                isvalid = true
            }
        }
        return isvalid
    },

    isValidEmail(num) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(num);
    },

    hasSpecialChar(str) {
        var iChars = "~`!#$%^&*+=-@[]\\\';,/{}|\":<>?";
        for (var i = 0; i < str.length; i++) {
            if (iChars.indexOf(str.charAt(i)) > -1) {
                return true;
            }
        }
        return false;
    },

    resetStackNavigator(navigation, routeName) {
        if (navigation && !this.isEmptyString(routeName)) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: routeName },
                    ],
                })
            );
        }
    },

    getMomentDate(date, type) {
        return (
            moment(date).format(type)
        )
    },

    openLink(url) {
        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        }
    },
    alert(title, description, confirmText, cancelText, onConfirmPress) {
        Alert.alert(title, description, [
            {
                text: cancelText,
            },
            {
                text: confirmText, onPress: () => {
                    onConfirmPress()
                }
            }
        ])
    },
}

