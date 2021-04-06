import { Platform, StyleSheet } from 'react-native';
import AppConfig from './AppConfig';
import { FontSize, Height, Width } from './Dimensions';

const primaryColor = AppConfig.primaryColor
const secondryColor = AppConfig.secondryColor
const lightSecondaryColor = AppConfig.lightSecondaryColor

const defaultFont = AppConfig.regularFonts
const mediumFont = AppConfig.mediumFonts
const boldFont = AppConfig.boldFonts

const textFont = { fontFamily: defaultFont }
const mediumTextFont = { fontFamily: mediumFont }
const boldTextFont = { fontFamily: boldFont }

const defaultColor = AppConfig.defaultColor
const errorColor = "#EF5350"
const borderColor = "#ddd"
const lightTextColor = "#999"

const textDefault = {
    color: secondryColor
}

const EmptyState = StyleSheet.create({
    coverfill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        backgroundColor: 'white'
    },

    cover: {
        flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center'
    },
    image: {
        height: Width(50),
        width: Width(50)
    },
    headText: {
        ...boldTextFont,
        fontSize: FontSize(13)
    },
    text: {
        ...textFont,
        fontSize: FontSize(10)
    }
})

const HeadingStyle = StyleSheet.create({
    h2: {
        ...mediumTextFont,
        fontSize: 24
    },
})
const formDefault = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        marginBottom: 10,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 0,
        color: '#000',
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        fontFamily: defaultFont
    },
    inputLoc: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        fontFamily: defaultFont
    },
    icon: {
        position: 'relative',
        top: -2.883,
        paddingBottom: 3,
        paddingRight: 10,
        right: -4
    },
    inputsection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    bottomset: {
        position: "absolute", left: 0, right: 0, bottom: 10, paddingRight: 0, paddingLeft: 30, backgroundColor: '#FEFEFE'
    },
})
const promptsStyle = StyleSheet.create({
    mainView: {
        padding: Width(5), marginVertical: Height(6),
        alignItems: "center",
    },
    inputMainView: {
        flex: 1, width: "100%",
        marginBottom: Height(3), flex: 1
    },
    _2ndInnerView: {
        marginVertical: Height(5)
    },
    topHeading: {
        ...textFont, fontSize: FontSize(20), textAlign: "center"
    },
    bottomHeading: {
        ...textFont, fontSize: FontSize(25)
    },
    bottomButtonMain: {
        marginVertical: Height(2),
        marginTop: Height(5)
    },
    bottomButtonTitle: {
        fontSize: FontSize(16),
        marginRight: Width(3)
    },
    bottomButtonBackground: {
        backgroundColor: primaryColor,
        padding: Width(3.5), paddingHorizontal: Width(6),
        borderRadius: .5
    }
})
const settingsCSS = StyleSheet.create({
    mainContainer: {
        padding: Width(8),
        justifyContent: "center",
        // paddingVertical: Height(6),
    },
    titleMain: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        paddingVertical: Height(3),
    },
})
const customElevation = {
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: .5,
        },
        android: {
            borderBottomColor: "#ccc",
            borderBottomWidth: .1,
            elevation: 1,
        },
    }),
}
export {
    textFont, formDefault, primaryColor, secondryColor, defaultFont, textDefault, HeadingStyle,
    mediumTextFont, boldTextFont, defaultColor, borderColor, errorColor, lightTextColor, promptsStyle,
    settingsCSS, customElevation, EmptyState, lightSecondaryColor
}
