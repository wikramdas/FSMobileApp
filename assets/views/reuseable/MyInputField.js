import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Platform } from 'react-native'
import { borderColor, defaultColor, textFont, lightTextColor, primaryColor, defaultFont } from '../../utils/Style'
import FIcons from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { FontSize, Height, Width } from '../../utils/Dimensions'
import Utils from '../../utils/Utils'

export default class MyInputField extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPassword: props.isPassword ? props.isPassword : false,
            inputIcon: props.inputIcon ? props.inputIcon : "",
            iconType: props.iconType ? props.iconType : "",
            isSearch: props.isSearch ? props.isSearch : false,
            isChevDown: props.isChevDown ? props.isChevDown : false,
            editable: props.editable ? props.editable : true,
            showPassword: false,
            inputText: props.value ? props.value : "",
            maxLength: props.maxLength ? props.maxLength : undefined,
            label: props.label ? props.label : "",
            keyboardType: props.keyboardType ? props.keyboardType : "default",
            returnKeyType: props.returnKeyType ? props.returnKeyType : "done",
            hint: props.hint ? props.hint : "",
            autoFocus: props.autoFocus ? props.autoFocus : false,
            multiline: props.multiline ? props.multiline : false,
            numberOfLines: props.numberOfLines ? props.numberOfLines : 1,
            labelCSS: props.labelCSS ? props.labelCSS : {},
            inputContainerCSS: props.inputContainerCSS ? props.inputContainerCSS : {},
        }
    }

    render() {
        let { label, hint, isPassword, showPassword, keyboardType, returnKeyType,
            editable, autoFocus, multiline, numberOfLines, isSearch, isChevDown, inputText,
            maxLength, iconType, inputIcon, labelCSS, inputContainerCSS } = this.state
        if (this.props.value) {
            inputText = this.props.value
        } else {
            inputText = ""
        }
        return (
            <View style={{
                flex: 1
            }}>
                {label != "" &&
                    <Text style={[textFont, {
                        fontSize: FontSize(12), color: defaultColor,
                        marginBottom: Height(.8)
                    }, labelCSS]}> {label} </Text>
                }
                <View style={[{
                    width: "100%", flex: 1,
                    flexDirection: "row", alignItems: "center", justifyContent: "center",
                    borderRadius: Width(.8),
                    // ...customElevation,
                    // ...Platform.select({
                    //     ios: {
                    //         borderColor: borderColor,
                    //         borderBottomWidth: .5
                    //     }
                    // }),
                    borderColor: borderColor,
                    borderBottomWidth: .5,
                    backgroundColor: defaultColor,
                    paddingHorizontal: Width(3),
                    marginBottom: Height(1)
                }, inputContainerCSS]}>
                    <View>
                        {inputIcon != "" &&
                            <>
                                {iconType == "fontawesome" ?
                                    <FontAwesome name={inputIcon} size={FontSize(16)} color={lightTextColor} />
                                    :
                                    iconType == "evil" ?
                                        <EvilIcons name={inputIcon} size={FontSize(16)} color={lightTextColor} />
                                        :
                                        <FIcons name={inputIcon} size={FontSize(16)} color={lightTextColor} />
                                }
                            </>
                        }
                    </View>
                    <TextInput
                        editable={editable == "false" ? false : true}
                        ref={(input) => { this.handleOnInputRef(input) }}
                        style={{
                            ...textFont, flex: 1,
                            fontSize: FontSize(12),
                            // paddingLeft: Width(3), 
                            padding: Width(2.5),
                            paddingTop: (Platform.OS == "ios" && multiline) ? Height(1.5) : Height(1),
                            color: editable == "false" ? lightTextColor : primaryColor,
                        }}
                        maxLength={maxLength}
                        placeholder={hint}
                        placeholderTextColor={lightTextColor}
                        value={inputText}
                        onChangeText={(text) => { this.handleOnTextChange(text) }}
                        underlineColorAndroid={"rgba(0,0,0,0)"}
                        keyboardType={keyboardType} //email-address,number-pad,phone-pad
                        autoCapitalize={"none"}
                        returnKeyType={returnKeyType}
                        onSubmitEditing={() => { this.handleOnSubmit() }}
                        secureTextEntry={isPassword && !showPassword}
                        autoFocus={autoFocus}
                        multiline={multiline}
                        numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
                        minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}
                    />
                    {isPassword &&
                        <TouchableOpacity activeOpacity={0.7} onPress={() => { this.handleOnTogglePass() }}>
                            <FIcons name={showPassword ? "eye" : "eye-off"} size={FontSize(16)} color={"#aaa"} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    updateValue(val) {
        this.setState({ inputText: val })
    }
    updatePlaceholder(val) {
        this.setState({ hint: val })
    }

    handleOnInputRef(inputRef) {
        if (this.props.onRef) {
            this.props.onRef(inputRef)
        }
    }

    handleOnSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit()
        }
    }

    handleOnTogglePass() {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleOnTextChange(text) {
        this.setState({ inputText: text })
        if (this.props.onChangeText) {
            this.props.onChangeText(text)
        }
    }
}
