import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from "react-redux";
import FSDBHandler from '../../data/firebase/FSDBHandler';
import { FontSize, Height, Width } from '../../utils/Dimensions';
import { boldTextFont, borderColor, errorColor, textFont } from '../../utils/Style';
import MyUtils from '../../utils/Utils';
import Button from '../reuseable/Button';
import MyInputField from '../reuseable/MyInputField';
import MyPicker from '../reuseable/MyPicker';
const fSDBHandler = new FSDBHandler()
const iconSize = FontSize(25)
class CalculatorView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: true,
            textValue: "",
            firstNo: "",
            secondNo: "",
            selectedOperator: "",
            operators: [
                { key: "Select Operator", value: "" },
                { key: "Add (+)", value: "plus" },
                { key: "Substract (-)", value: "minus" },
                { key: "Multiply (*)", value: "multiply" }
            ],
            calculatedData: []
        }
    }
    componentDidMount() {
        fSDBHandler.loadCalculatedData(response => {
            this.setState({ calculatedData: response, isRefreshing: false })
        })
    }
    handleOnCalculate() {
        let { firstNo, secondNo, selectedOperator, operators } = this.state
        if (MyUtils.isEmptyString(firstNo)) {
            MyUtils.showSnackbar("Kindly enter first value", errorColor)
            return
        }
        if (MyUtils.isEmptyString(secondNo)) {
            MyUtils.showSnackbar("Kindly enter second value", errorColor)
            return
        }
        if (MyUtils.isEmptyString(selectedOperator)) {
            MyUtils.showSnackbar("Kindly select operator to calculate value", errorColor)
            return
        }
        let calculatedValue = 0
        switch (selectedOperator) {
            case "plus":
                calculatedValue = +firstNo + +secondNo
                break;
            case "minus":
                calculatedValue = +firstNo - +secondNo
                break;
            case "multiply":
                calculatedValue = +firstNo * +secondNo
                break;
            default:
                break;
        }

        let calData = {
            "firstNumber": firstNo,
            "secondNumber": secondNo,
            "operator": selectedOperator,
            "calculatedValue": calculatedValue,
        }
        fSDBHandler.insertCalculatedData(calData, (onResponse) => {
            if (onResponse) {
                this.setState({
                    firstNo: "",
                    secondNo: "",
                    selectedOperator: "",
                })
                if (this.myPicker) {
                    this.myPicker.updateOptions(operators)
                    this.myPicker.updateSelectedVal("")
                }
                this.componentDidMount()
                MyUtils.showSnackbar("value has been posted")
            }
        })
    }
    returnOperator(operator) {
        switch (operator) {
            case "plus":
                return "+"
                break;
            case "minus":
                return "-"
                break;
            case "multiply":
                return "*"
                break;
            default:
                break;
        }
    }
    renderItems(item, index) {
        return (
            <View key={index.toString()} style={{
                flex: 1, flexDirection: "row",
                alignItems: "center", justifyContent: "center",
                margin: Width(1), borderWidth: 1, borderColor: borderColor,
                borderRadius: 4, padding: Width(1), paddingHorizontal: Width(5)
            }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{
                        ...textFont, fontSize: FontSize(12)
                    }}>{item.firstNumber}</Text>

                    <Text style={{
                        ...textFont, fontSize: FontSize(12), marginHorizontal: Width(2)
                    }}>{this.returnOperator(item.operator)}</Text>

                    <Text style={{
                        ...textFont, fontSize: FontSize(12)
                    }}>{item.secondNumber}</Text>
                </View>
                <Text style={{
                    ...textFont, fontSize: FontSize(12)
                }}> = {item.calculatedValue}</Text>
            </View>
        )
    }
    onRefresh() {
        this.setState({ isRefreshing: true }, () => {
            this.componentDidMount()
        })
    }
    render() {
        let { calculatedData, operators, selectedOperator, isRefreshing, firstNo, secondNo } = this.state
        return (
            <View style={{
                flex: 1, backgroundColor: "#fff",
            }}>

                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={isRefreshing}
                    data={calculatedData}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold
                    stickyHeaderIndices={[0]}
                    ListHeaderComponent={
                        <View style={{}}>
                            <MyInputField
                                hint={"Enter 1st number..."}
                                onChangeText={(text) => { this.setState({ firstNo: text }) }}
                                returnKeyType={"next"}
                                keyboardType="number-pad"
                                value={firstNo}
                                // onSubmit={() => { this.handleOnSubmit() }}
                            />
                            <MyInputField
                                hint={"Enter 2nd number..."}
                                onChangeText={(text) => { this.setState({ secondNo: text }) }}
                                returnKeyType={"done"}
                                keyboardType="number-pad"
                                value={secondNo}
                                // onSubmit={() => { this.handleOnSubmit() }}
                            />
                            <View>
                                <MyPicker
                                    ref={ref => this.myPicker = ref}
                                    options={operators}
                                    selectedValue={selectedOperator}
                                    onItemSelected={(item) => {
                                        this.setState({ selectedOperator: item.value })
                                    }}
                                />
                            </View>
                            <View style={{ marginHorizontal: Width(2) }}>
                                <Button
                                    title="Calculate"
                                    titleStyle={{ ...boldTextFont, fontSize: FontSize(16), textAlign: "center", flex: 1 }}
                                    background={{ padding: Width(1), paddingHorizontal: Width(4), alignItems: "center" }}
                                    onPress={() => this.handleOnCalculate()}
                                />
                            </View>
                        </View>
                    }
                    renderItem={({ item, index }) => this.renderItems(item, index)}
                />
            </View>
        )
    }
}
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn
    }
}
export default connect(mapStateToProps, null)(CalculatorView)