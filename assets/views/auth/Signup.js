import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import UserFSHandler from '../../data/firebase/UserFSHandler';
import { FontSize, Height, Width } from '../../utils/Dimensions';
import { boldTextFont, errorColor, lightTextColor, textFont } from '../../utils/Style';
import MyUtils from '../../utils/Utils';
import MyInputField from '../reuseable/MyInputField';
import Button from './../reuseable/Button';
const fSDBHandler = new UserFSHandler()
class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: "",
            email: "",
            mobileNo: "",
            password: "",
            isLoading: false
        }
    }
    componentDidMount() {
    }
    checkPasswordStrength(password) {
        var strength = 0;
        var testCase1 = /[a-z]+/;
        var testCase2 = /[A-Z]+/;
        var testCase3 = /[0-9]+/;
        var testCase4 = /[$@#&!]+/;

        if (testCase1.test(password)) {
            strength += 1;
        }
        if (testCase2.test(password)) {
            strength += 1;
        }
        if (testCase3.test(password)) {
            strength += 1;
        }

        if (testCase4.test(password)) {
            strength += 1;
        }

        if (password.length > 5) {

            switch (strength) {
                case 0:
                    // console.log("========STRENGTH========", 0)
                    return ("")
                    break;

                case 1:
                    // console.log("========STRENGTH========", 25)
                    return ("Weak")
                    break;

                case 2:
                    // console.log("========STRENGTH========", 50)
                    return ("Medium")
                    break;

                case 3:
                    // console.log("========STRENGTH========", 75)
                    return ("Medium")
                    break;

                case 4:
                    // console.log("========STRENGTH========", 100)
                    return ("Strong")
                    break;
            }
        }
        else { return ("Min 6 character") }
    }

    setPasswordStrengthColor(password) {
        var strength = 0;
        var testCase1 = /[a-z]+/;
        var testCase2 = /[A-Z]+/;
        var testCase3 = /[0-9]+/;
        var testCase4 = /[$@#&!]+/;

        if (testCase1.test(password)) {
            strength += 1;
        }
        if (testCase2.test(password)) {
            strength += 1;
        }
        if (testCase3.test(password)) {
            strength += 1;
        }

        if (testCase4.test(password)) {
            strength += 1;
        }
        switch (strength) {
            case 0:
                // console.log("========STRENGTH========", 0)
                return ("#979797")
                break;

            case 1:
                // console.log("========STRENGTH========", 25)
                return ("#F26A6A")
                break;

            case 2:
                // console.log("========STRENGTH========", 50)
                return ("#F2C96A")
                break;

            case 3:
                // console.log("========STRENGTH========", 75)
                return ("#F2C96A")
                break;

            case 4:
                // console.log("========STRENGTH========", 100)
                return ("green")
                break;
        }

    }

    setPasswordStrengthChar(password) {
        var strength = 0;
        var testCase1 = /[a-z]+/; //1
        var testCase2 = /[A-Z]+/;  //2
        var testCase3 = /[0-9]+/;  //4
        var testCase4 = /[$@#&!]+/; //8

        if (testCase1.test(password)) {
            strength += 1;
        }
        if (testCase2.test(password)) {
            strength += 2;
        }
        if (testCase3.test(password)) {
            strength += 4;
        }

        if (testCase4.test(password)) {
            strength += 8;
        }
        switch (strength) {
            case 0:
                // console.log("========STRENGTH========", 0)
                return ("#A1a@!")
                break;

            case 1:
                // console.log("========STRENGTH========", 25)
                return ("#A1@!")
                break;

            case 2:
                // console.log("========STRENGTH========", 50)
                return ("#1a@!")
                break;

            case 4:
                // console.log("========STRENGTH========", 75)
                return ("#Aa@!")
                break;

            case 8:
                // console.log("========STRENGTH========", 100)
                return ("A1a")
                break;
            case 15:
                // console.log("========STRENGTH========", 100)
                return ("")
                break;
            case 3:
                // console.log("========STRENGTH========", 100)
                return ("#1@!")
                break;
            case 5:
                // console.log("========STRENGTH========", 100)
                return ("#A@!")
                break;
            case 9:
                // console.log("========STRENGTH========", 100)
                return ("A1")
                break;
            case 6:
                // console.log("========STRENGTH========", 100)
                return ("#a@!")
                break;
            case 10:
                // console.log("========STRENGTH========", 100)
                return ("1a")
                break;
            case 12:
                // console.log("========STRENGTH========", 100)
                return ("Aa")
                break;
            case 7:
                // console.log("========STRENGTH========", 100)
                return ("#@!")
                break;
            case 13:
                // console.log("========STRENGTH========", 100)
                return ("A")
                break;

        }
    }
    handleOnSignUp() {
        let { email, password, fullName, mobileNo } = this.state
        if (!MyUtils.isValidEmail(email)) {
            MyUtils.showSnackbar("Enter a valid email address", errorColor)
            return
        }
        if (this.checkPasswordStrength(password) != "Strong") {
            MyUtils.showSnackbar("Enter a valid password", errorColor)
            return
        }
        this.setState({ isLoading: true })
        fSDBHandler.userSignUp(email, password, (responseJson) => {
            if (responseJson) {
                MyUtils.resetStackNavigator(this.props.navigation, "Home")
                MyUtils.showSnackbar("Account has been created successfully")
            }
            this.setState({ isLoading: false })
        })
    }
    render() {
        let { email, password, fullName, mobileNo, isLoading } = this.state
        return (
            <View style={{
                flex: 1, backgroundColor: "#fff",
            }}>
                <View style={{
                    flex: 1, backgroundColor: "#fff",
                    alignItems: "center", justifyContent: "center",
                }}>
                    {isLoading ? MyUtils.renderLoadingState()
                        :
                        <KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} showsVerticalScrollIndicator={false}>
                            <View style={{
                                padding: Width(5), paddingHorizontal: Width(8),
                                marginTop: Height(10)
                            }}>
                                <Text style={{ ...textFont, fontSize: FontSize(20) }}>Create Account</Text>
                                <Text style={{ ...textFont, fontSize: FontSize(11), paddingVertical: Height(1), color: lightTextColor }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget convallis ex. Ut elementum libero.</Text>
                                <View style={{ marginBottom: Height(2) }}>
                                    <MyInputField
                                        onRef={(ref) => this.emailRef = ref}
                                        hint={"Email Address"}
                                        onChangeText={(text) => { this.setState({ email: text }) }}
                                        keyboardType="email-address"
                                        returnKeyType={"next"}
                                        value={email}
                                        inputIcon={"mail"}
                                        onSubmit={() => { this.passwordRef.focus() }}
                                    />
                                </View>
                                <View style={{ marginBottom: Height(2) }}>
                                    <MyInputField
                                        onRef={(ref) => this.passwordRef = ref}
                                        hint={"Password"}
                                        onChangeText={(text) => { this.setState({ password: text }) }}
                                        returnKeyType={"next"}
                                        value={password}
                                        isPassword={true}
                                        inputIcon={"lock"}
                                        onSubmit={() => { this.handleOnSignUp() }}
                                    />
                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <Text style={{ flex: 1, ...textFont, fontSize: FontSize(12), color: this.setPasswordStrengthColor(password) }}>{this.checkPasswordStrength(password)}</Text>
                                        <Text style={{ ...textFont, fontSize: FontSize(12) }}>{this.setPasswordStrengthChar(password)}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={.8}
                                    onPress={() => alert("forgot password")}
                                    style={{ alignSelf: "flex-end" }}
                                >
                                    <Text style={{ ...textFont, fontSize: FontSize(12) }}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Button
                                    title="SIGN UP"
                                    titleStyle={{ ...boldTextFont, fontSize: FontSize(16) }}
                                    onPress={() => this.handleOnSignUp()}
                                    rightIconType={"feather"}
                                    rightIcon={"chevrons-right"}
                                    background={[styles.bottomButton]}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bottomButton: {
        padding: Width(3), alignItems: "center",
        justifyContent: "center", backgroundColor: "#000",
        paddingHorizontal: Width(6), borderRadius: 5
    }
})
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn
    }
}
export default connect(mapStateToProps, null)(SignUp)