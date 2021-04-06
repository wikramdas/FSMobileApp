import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CATEGORIES_LIST, LOGIN, UPDATE_USER } from '../../redux/Constants';
import store from '../../redux/Reducers';
import { errorColor } from '../../utils/Style';
import MyUtils from '../../utils/Utils';
import GFSDBHandler from './FSDBHandler';
const gFSDBHandler = new GFSDBHandler()
const MAX_MSGS_LOAD_COUNT = 20
const usersCollection = firestore().collection('USERS');
// const authUserId = auth().currentUser.uid

export default class FSDBHandler {
    async onAuthStateChanged(onResponse) {
        const userData = await auth().onAuthStateChanged(user => {
            if (user) {
                store.dispatch({ type: LOGIN, data: true })
                onResponse(user)
            } else {
                onResponse(null)
            }
        })
    }

    async sendEmailVerification(onResponse) {
        var user = await auth().currentUser;
        user.sendEmailVerification().then(function () {
            onResponse(true)
        }).catch(function (error) {
            onResponse(false)
            console.log("sendEmailVerification error", error);
        })
    }

    userSignUp(email, password, onResponse) {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                onResponse(true)
                console.log('User account created!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    MyUtils.showSnackbar('That email address is already in use!', errorColor);
                } else if (error.code === 'auth/invalid-email') {
                    MyUtils.showSnackbar('That email address is invalid!', errorColor);
                } else if (error.code === 'auth/network-request-failed') {
                    MyUtils.showSnackbar('Please check your internet connection', errorColor);
                }
                onResponse(false)
                console.log(error);
            });
    }

    async userLogin(email, password, onResponse) {
        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                onResponse(true)
                gFSDBHandler.getCategoriesData(catData => {
                    // store.dispatch({ type: CATEGORIES_LIST, data: catData })
                })
                this.getUserData(catData => { })
                console.log('User signed in!');
            })
            .catch(error => {
                let errorMsg = ""
                if (error.code === 'auth/user-not-found') {
                    errorMsg = "This email is not registered"
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = "That email address is invalid!"
                } else if (error.code === 'auth/wrong-password') {
                    errorMsg = "Invalid Password"
                } else if (error.code === "auth/too-many-requests") {
                    errorMsg = "Access to this account has been temporarily disabled"
                } else if (error.code === 'auth/network-request-failed') {
                    MyUtils.showSnackbar('Please check your internet connection', errorColor);
                }
                MyUtils.showSnackbar(errorMsg, errorColor);
                onResponse(false)
                console.log(error);
            });
    }
    async getUserData(onCompleted) {
        const authUserId = auth().currentUser.uid
        const userRef = usersCollection.doc(authUserId);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            onCompleted(null)
        } else {
            console.log("===userDoc.data()===", userDoc.data())
            store.dispatch({ type: UPDATE_USER, data: userDoc.data() })
            onCompleted(userDoc.data())
        }
    }

    async sendPasswordResetEmail(Email, onCompleted) {
        auth().sendPasswordResetEmail(Email)
            .then(user => {
                onCompleted(true)
            }).catch(function (error) {
                onCompleted(null)
                let errorMsg = ""
                if (error.code === 'auth/user-not-found') {
                    errorMsg = "This email is not registered"
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = "That email address is invalid!"
                } else if (error.code === 'auth/wrong-password') {
                    errorMsg = "Invalid Password"
                } else if (error.code === "auth/too-many-requests") {
                    errorMsg = "Access to this account has been temporarily disabled"
                }
                MyUtils.showSnackbar(errorMsg, errorColor);
                console.log(error)
            })
    }

    async updateAuthUser(data, onCompleted) {
        // const update = {
        //     displayName: 'Wikram Das',
        //     photoURL: 'https://img.icons8.com/bubbles/2x/user-male.png',
        //     phoneNumber: "03042398500",
        //     emailVerified: "true",
        //     address: "Abbasia Town RYK",
        // }
        await auth().currentUser.updateProfile(data);
    }

    logout(onSuccess) {
        auth()
            .signOut()
            .then(() => {
                onSuccess(true)
                console.log('User signed out!')
            })
            .catch((error) => {
                onSuccess(false)
                console.log(error)
            })
    }
}