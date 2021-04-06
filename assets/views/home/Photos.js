import React from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from "react-redux";
import FSDBHandler from '../../data/firebase/FSDBHandler';
import { FontSize, Height, Width } from '../../utils/Dimensions';
import { boldTextFont, borderColor, lightSecondaryColor, secondryColor, textFont } from '../../utils/Style';
import MyUtils from '../../utils/Utils';
import Button from '../reuseable/Button';
const fSDBHandler = new FSDBHandler()
const iconSize = FontSize(25)
class MyRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mediaData: "",
            imagesData: []
        }
    }
    componentDidMount() {
        fSDBHandler.getUploadedFiles(response => {
            var imagesData = []
            if (!MyUtils.isEmptyarray(response)) {
                response.map((url, index) => {
                    imagesData.push({ imageUri: url })
                })
            }
            this.setState({ imagesData })
        })
    }
    handleOnUploadAlert() {
        Alert.alert("Choose an option", "Please select an option to continue", [
            {
                text: "Camera", onPress: () => {
                    this.handleOnImagePicker("camera")
                }
            },
            {
                text: "Gallery", onPress: () => {
                    this.handleOnImagePicker("gallery")
                }
            }
        ])
    }
    handleOnImagePicker(type) {
        if (type == "camera") {
            ImagePicker.openCamera({
                width: 400,
                height: 300,
                cropping: true,
            }).then(image => {
                console.log(image);
                this.setState({ mediaData: image })
            });
        } else {
            ImagePicker.openPicker({
                width: 400,
                height: 300,
                cropping: true
            }).then(image => {
                console.log(image);
                this.handleOnImageUpload(image)
                this.setState({ mediaData: image })
            });
        }
    }
    handleOnImageUpload(imageData) {
        const { path } = imageData;
        let { imagesData } = this.state
        imagesData.push({ imageUri: path })
        this.setState({ imagesData })
        const filename = path.substring(path.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path;
        fSDBHandler.uploadFiles(filename, uploadUri, (response) => {
            console.log("====snapshot====", response)
        })
    }
    render() {
        let { mediaData, imagesData } = this.state
        return (
            <View style={{
                flex: 1, backgroundColor: "#fff",
                alignItems: "center", justifyContent: "center"
            }}>
                {!MyUtils.isEmptyarray(imagesData) ?
                    <ScrollView style={{
                        width: "100%",
                    }}>
                        <View style={{ width: "100%", }}>
                            {imagesData.map((item, index) => {
                                return (
                                    <View key={index.toString()} style={{
                                        alignItems: "center", justifyContent: "center",
                                        margin: Width(2)
                                    }}>
                                        <Image
                                            style={{
                                                width: "100%", height: Width(60),
                                                borderColor: borderColor, borderWidth: 1,
                                                borderRadius: Width(2)
                                            }}
                                            resizeMode={"cover"}
                                            source={{ uri: item.imageUri }}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    :
                    null
                }

                <View style={{ marginVertical: Height(1) }}>
                    <Button
                        title="Upload Media"
                        titleStyle={{ ...boldTextFont, fontSize: FontSize(16) }}
                        background={{ padding: Width(2), paddingHorizontal: Width(7) }}
                        onPress={() => this.handleOnUploadAlert()}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row", alignItems: "center",
    },
    mainContainer: {
        borderRadius: Width(3), backgroundColor: lightSecondaryColor,
        margin: Width(2)
    },
    innerMain: {
        margin: Width(.3), backgroundColor: "#fff",
        borderBottomLeftRadius: Width(3),
        borderBottomRightRadius: Width(3),
        marginTop: 0, borderRadius: 1, padding: Width(3)
    },
    headingTextStyle: {
        ...textFont, fontSize: FontSize(12),
        color: secondryColor
    },
    textStyle: {
        ...textFont, fontSize: FontSize(12),
        color: "#000"
    }
})
mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn
    }
}
export default connect(mapStateToProps, null)(MyRequests)