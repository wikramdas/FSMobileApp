import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { boldTextFont, defaultColor, primaryColor, secondryColor, textFont } from '../../utils/Style'
import { FontSize, Height, Width } from '../../utils/Dimensions'
import { connect } from 'react-redux'
const Header = (props) => {
    const handleOnToggle = () => {
        if (props.navigation) {
            props.navigation.goBack();
        }
    }

    const handleOnNotifications = () => {
        props.navigation.navigate('Notifications');
    }

    const handleOnSearch = (navigation, catData) => {
        if (navigation) {
            navigation.navigate("Search", { categoryData: catData })
        }
    }
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            paddingVertical: Height(2.4),
            // paddingTop: Height(5),
            paddingHorizontal: Width(3),
            // width: '100%',
            // ...customElevation,
            zIndex: 9999,
            shadowOpacity: 0.1,
            borderBottomWidth: .3,
            borderBottomColor: secondryColor
        }}>
            <View style={{ alignSelf: "flex-start", }}>
                <TouchableOpacity style={{ marginRight: Width(1.5) }} activeOpacity={0.7} onPress={() => { props.isMenu ? props.onPress() : handleOnToggle() }}>
                    {props.isMenu ?
                        <Icon name={"menu"} size={FontSize(25)} color={"#fff"} />
                        :
                        <Icon name={"arrow-left"} size={FontSize(25)} color={"#fff"} />
                    }
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center", marginLeft: Width(4) }}>
                {props.title && props.title != "" &&
                    <Text numberOfLines={1} style={[textFont, { fontSize: FontSize(16), ...boldTextFont, color: defaultColor }]}>
                        {props.title}
                    </Text>
                }
            </View>

            <View style={{ alignSelf: "flex-end", justifyContent: "center" }}>
                {props.rightTitle && props.rightTitle != "" ?
                    <Text numberOfLines={1} style={[textFont, { fontSize: FontSize(16), ...textFont, color: secondryColor, marginRight: Width(5) }]}>
                        {props.rightTitle}
                    </Text>
                    :
                    props.isRightIcon ?
                        <TouchableOpacity style={{ marginRight: Width(1.5) }} activeOpacity={0.7} onPress={() => { props.onRightIconPress() }}>
                            <Icon name={props.rightIcon} size={FontSize(25)} color={"#fff"} />
                        </TouchableOpacity>
                        :
                        null
                }
            </View>
        </View>
    )
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
    }
}
export default connect(mapStateToProps, null)(Header)
