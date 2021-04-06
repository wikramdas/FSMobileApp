import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import FIcons from 'react-native-vector-icons/Feather'
import { borderColor, pickerContainer, textFont } from "../../utils/Style";
import MyUtils from "../../utils/Utils";
import { FontSize, Height, Width } from '../../utils/Dimensions';

class MyPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            options: props.options ? props.options : [],
            selectedVal: props.selectedValue ? props.selectedValue : ""
        }
    }

    getSelectedItemKey(val) {
        let key = this.state.selectedVal
        let { options } = this.state
        let indx = options.findIndex(item => item.value == val)
        if (indx > -1) {
            key = options[indx].key
        }
        return key
    }

    updateOptions(options) {
        if (options) {
            this.setState({ options })
        }
    }
    updateSelectedVal(selectedVal) {
        if (selectedVal) {
            this.setState({ selectedVal })
        }
    }

    render() {
        return (
            <View style={{
                borderBottomColor: borderColor, borderBottomWidth: 1,
                marginVertical: Width(1)
            }}>
                <TouchableOpacity
                    style={{ padding: Width(2), flexDirection: "row", alignItems: 'center', paddingHorizontal: Width(5.5) }}
                    onPress={() => { this.setState({ modalVisible: true }) }}>
                    <Text numberOfLines={1} style={[textFont, {
                        flex: 1, fontSize: FontSize(13), color:
                            MyUtils.isEmptyString(this.state.selectedVal) ? "#999" : "#000"
                    }]}>
                        {this.getSelectedItemKey(this.state.selectedVal)}</Text>
                    <FIcons name='chevron-down' size={Width(5)} color={'#000'} />
                </TouchableOpacity>

                <Modal
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    onBackButtonPress={() => this.setState({ modalVisible: false })}
                >
                    <View style={styles.container}>
                        {this.state.options && this.state.options.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.handleOptionClick(item)}>
                                    <View style={{ paddingHorizontal: Width(5), flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                        <Text style={[{ fontSize: FontSize(14), paddingVertical: Height(1.5), paddingHorizontal: Width(4), ...textFont }]}>{item.key}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Modal>

            </View>
        );
    }

    handleOptionClick(itemData) {
        this.setState({ selectedVal: itemData.value })
        this.props.onItemSelected(itemData)
        this.onCancel()
    }

    onCancel() {
        this.setState({ modalVisible: false });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    }
});

export default MyPicker;