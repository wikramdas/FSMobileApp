import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from "react-redux";
import FSDBHandler from '../../data/firebase/FSDBHandler';
import { FontSize, Width } from '../../utils/Dimensions';
import { borderColor, textFont } from '../../utils/Style';
import MyUtils from '../../utils/Utils';
import MyInputField from '../reuseable/MyInputField';
const fSDBHandler = new FSDBHandler()
const iconSize = FontSize(25)
class TextView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: true,
            textValue: "",
            imagesData: [],
            textData: []
        }
    }
    componentDidMount() {
        fSDBHandler.loadTextData(response => {
            this.setState({ textData: response, isRefreshing: false })
        })
    }
    handleOnSubmit() {
        let { textValue } = this.state
        fSDBHandler.insertTextData(textValue, (onResponse) => {
            if (onResponse) {
                this.setState({ textValue: "" })
                this.componentDidMount()
                MyUtils.showSnackbar("text has been posted")
            }
        })
    }
    renderItems(item, index) {
        return (
            <View key={index.toString()} style={{
                alignItems: "center", justifyContent: "center",
                margin: Width(1), borderWidth: 1, borderColor: borderColor,
                borderRadius: 4, padding: Width(1)
            }}>
                <Text style={{
                    ...textFont, fontSize: FontSize(12)
                }}>{item.text}</Text>
            </View>
        )
    }
    onRefresh() {
        this.setState({ isRefreshing: true }, () => {
            this.componentDidMount()
        })
    }
    render() {
        let { textData, textValue, isRefreshing } = this.state
        return (
            <View style={{
                flex: 1, backgroundColor: "#fff",
            }}>

                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={isRefreshing}
                    data={textData}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold
                    stickyHeaderIndices={[0]}
                    ListHeaderComponent={
                        <View style={{}}>
                            <MyInputField
                                hint={"Enter text here..."}
                                onChangeText={(text) => { this.setState({ textValue: text }) }}
                                returnKeyType={"done"}
                                value={textValue}
                                onSubmit={() => { this.handleOnSubmit() }}
                            />
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
export default connect(mapStateToProps, null)(TextView)