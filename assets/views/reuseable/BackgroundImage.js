import React from 'react';
import { ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Height, ScreenHeight, ScreenWidth } from '../../utils/Dimensions';
import { primaryColor } from '../../utils/Style';
const BackgroundImage = (props) => {
    // console.log("=====props=======", props.children)
    return (
        <>
            <SafeAreaView style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: primaryColor,
                paddingTop: Height(3.5)
            }}>
                <StatusBar backgroundColor={"transparent"} translucent />
                {props.visible == false ?
                    props.children
                    :
                    <ImageBackground
                        resizeMode={"cover"}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            width: ScreenWidth,
                            height: ScreenHeight,
                            backgroundColor: primaryColor
                        }} source={require("../../images/background.png")}
                    >{props.children}</ImageBackground>
                }
            </SafeAreaView>
        </>
    )
}
export default connect(null, null)(BackgroundImage)