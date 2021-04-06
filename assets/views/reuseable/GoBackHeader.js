import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from "react-redux";
import MyInputField from '../../components/reuseable/MyInputField';
import PrefsManager from '../../data/local/LocalStorage';
import { BoldFont, defaultColor, defFont, primaryColor, secondaryColor, customElevation } from '../../utils/AppStyles';
import { FontSize, Height, Width } from '../../utils/Dimensions';
import MyUtils from '../../utils/MyUtils';
import SideNotifications from './SideNotifications';
import MySettingsIcon from './MySettingsIcon';
const prefs = new PrefsManager()
class GoBackHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isNotifIcon: props.isNotifIcon ? props.isNotifIcon : false,
            isMenu: props.isMenu ? props.isMenu : false,
            isSettingIcon: props.isSettingIcon ? props.isSettingIcon : false,
            isFilterIcon: props.isFilterIcon ? props.isFilterIcon : false,
            isHeaderSearch: props.isHeaderSearch ? props.isHeaderSearch : false,
            schedule: props.schedule ? props.schedule : false,
            isTextCenter: props.isTextCenter ? props.isTextCenter : false,
            showDateTimePicker: props._showDateTimePicker ? props._showDateTimePicker : "",
            placeholder: props.placeholder ? props.placeholder : "",
            inputValue: props.inputValue ? props.inputValue : "",
        }
    }
    render() {
        let { isTextCenter, isFilterIcon, isHeaderSearch, placeholder, isMenu } = this.state
        let { inputValue } = this.props
        return (
            <View style={{
                zIndex: 999,
                ...customElevation,
                shadowOpacity: this.props.isSearch ? 0 : 0.1,
            }}>
                <View style={{
                    flexDirection: "row", justifyContent: "center", alignItems: "center",
                    backgroundColor: "#fff", width: '100%', paddingVertical: Height(1.7),
                    borderBottomWidth: .3,
                    borderBottomColor: secondaryColor
                }}>

                    <View style={{ flexDirection: "row", flex: .25, alignItems: "center", justifyContent: "flex-start" }}>
                        {isMenu ?
                            <TouchableOpacity style={{ paddingHorizontal: Width(3), }} activeOpacity={0.7} onPress={() => { this.handleOnToggle() }}>
                                <Icon name={"align-left"} size={FontSize(25)} color={defaultColor} />
                            </TouchableOpacity>
                            :
                            MyUtils.renderBackButton(() => { this.handleOnBackPress() })}
                    </View>

                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        {this.props.title && this.props.title != "" &&
                            <Text numberOfLines={1} style={[defFont, { flex: 1, fontSize: FontSize(14), fontFamily: BoldFont, color: defaultColor, textAlign: isTextCenter ? "center" : "auto" }]}>
                                {this.props.title}
                            </Text>
                        }
                        {isHeaderSearch &&
                            <View style={[defFont, { flex: 1, marginHorizontal: Width(2), }]}>
                                <MyInputField
                                    // label={"Search"}
                                    hint={"Search..."}
                                    onChangeText={(text) => { this.props.onChange(text) }}
                                    // isSearch={true}
                                    returnKeyType={"go"}
                                    value={inputValue}
                                    onSubmit={() => this.props.onSubmit()}
                                />
                            </View>
                        }
                    </View>

                    <View style={{ flex: .25, marginRight: Width(2), alignItems: "center", flexDirection: "row", justifyContent: "flex-end" }}>
                        {this.state.isNotifIcon && <View>
                            <SideNotifications navigation={this.props.navigation} />
                        </View>}

                        {this.state.isSettingIcon && <View>
                            <MySettingsIcon navigation={this.props.navigation} />
                        </View>}
                        {isFilterIcon &&
                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate("FilterScreen")}>
                                <Icon style={{ padding: Width(1.1) }} size={FontSize(20)} name="filter" color={defaultColor} />
                            </TouchableOpacity>
                        }
                    </View>

                </View>
                {this.props.isSearch &&
                    <View style={[defFont, { marginHorizontal: Width(4), marginVertical: Height(.5), backgroundColor: "#fff" }]}>
                        <MyInputField
                            // label={"Search"}
                            hint={placeholder}
                            onChangeText={(text) => { this.setState({ inputValue: text }); this.props.onChange(text) }}
                            isSearch={true}
                            returnKeyType={"go"}
                            value={inputValue}
                            onSubmit={() => this.props.onSubmit()}
                        />
                    </View>
                }
            </View>
        )
    }
    handleOnToggle() {
        if (this.props.navigation) {
            this.props.navigation.toggleDrawer();
        }
    }
    handleOnBackPress() {
        if (this.props.navigation) {
            if (this.props.isLastView) {
                MyUtils.resetStackNavigator(this.props.navigation, "MainDrawer", null)
            } else {
                this.props.navigation.goBack()
            }
        }
    }
}
const mapStateToProps = (state) => {
    return {
        counter: 0
    }
}

export default connect(mapStateToProps, null)(GoBackHeader)
