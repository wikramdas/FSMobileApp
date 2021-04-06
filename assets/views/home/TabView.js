import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { FontSize, Height, ScreenHeight, ScreenWidth, Width } from '../../utils/Dimensions';
import { secondryColor, textFont } from '../../utils/Style';
import BackgroundImage from '../reuseable/BackgroundImage';
import Header from '../reuseable/Header';
import CalculatorView from './CalculatorView';
import Notifications from './Notifications';
import Photos from './Photos';
import TextView from './TextView';

class TabViewUI extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        isLoading: false,
        index: 0,
        routes: [
            { key: '1', title: "Notification" },
            { key: '2', title: "Photos" },
            { key: '3', title: "Text" },
            { key: '4', title: "Calculator" },
        ],
    };
    componentDidMount() {
    }
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case '1':
                return <Notifications requestType='inprogress' jumpTo={jumpTo} />
            case '2':
                return <Photos requestType='completed' jumpTo={jumpTo} />
            case '3':
                return <TextView requestType='completed' jumpTo={jumpTo} />
            case '4':
                return <CalculatorView requestType='completed' jumpTo={jumpTo} />
            default:
                return null;
        }
    }
    _renderLabel = ({ route }) => (
        <Text style={{ ...textFont, marginVertical: Height(1), fontSize: FontSize(10) }}>{route.title}</Text>
    );
    renderTabBar(props) {
        return (
            <TabBar
                {...props}
                bounces
                // scrollEnabled
                style={{ backgroundColor: "#fff", }}
                labelStyle={{ color: 'white', height: Height(4), }}
                indicatorStyle={{ backgroundColor: secondryColor, }}
                // activeColor={{ color: 'red' }}
                renderLabel={this._renderLabel}
            />
        );
    }
    render() {
        return (
            <BackgroundImage>
                <Header
                    title={"Home"}
                    isMenu={true}
                    onPress={() => console.log("menu")}
                    navigation={this.props.navigation}
                />
                <TabView
                    navigationState={this.state}
                    renderTabBar={(props) => this.renderTabBar(props)}
                    renderScene={this._renderScene}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: ScreenWidth, height: ScreenHeight }}
                />
                {/* <Footer
                    isOffline={false}
                    isSubscribe={false}
                /> */}
            </BackgroundImage>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.reducer.userInfo,
        isLoggedIn: state.reducer.isLoggedIn
    }
}
export default connect(mapStateToProps, null)(TabViewUI)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    bottomButton: {
        padding: Width(5), alignItems: "center",
        justifyContent: "center", backgroundColor: "red",
        paddingHorizontal: Width(10), borderRadius: 5
    }
});