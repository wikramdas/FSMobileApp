import React from 'react';
import { ImageBackground, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { FontSize, Height, ScreenHeight, ScreenWidth, Width } from '../../utils/Dimensions';
import { defaultFont, primaryColor, secondryColor, textFont } from '../../utils/Style';
import FIcons from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const BORDER_RADIUS = 15
const BoxShadowView = (props) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={.8} onPress={props.onPress}
                style={[{
                    flexDirection: "row", alignItems: "center", borderRadius: 5,
                    backgroundColor: "#000", padding:Width(4),
                }, props.background]}>
                {props.leftIconType == "feather" ?
                    <FIcons name={props.leftIcon} size={FontSize(18)} color={props.leftIconColor ? props.leftIconColor : secondryColor} />
                    :
                    props.leftIconType == "fontawesome" ?
                        <FontAwesome name={props.leftIcon} size={FontSize(18)} color={props.leftIconColor ? props.leftIconColor : secondryColor} />
                        :
                        null
                }
                <Text style={[{ ...textFont, fontSize: FontSize(14), color: "#fff", marginRight: Width(1) }, props.titleStyle]}>{props.title}</Text>
                {props.rightIconType == "feather" ?
                    <FIcons name={props.rightIcon} size={FontSize(18)} color={props.rightIconColor ? props.rightIconColor : secondryColor} />
                    :
                    props.rightIconType == "fontawesome" ?
                        <FontAwesome name={props.rightIcon} size={FontSize(18)} color={props.rightIconColor ? props.rightIconColor : secondryColor} />
                        :
                        null
                }
            </TouchableOpacity>
        </View>
    )
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
    }
}
export default connect(mapStateToProps, null)(BoxShadowView)